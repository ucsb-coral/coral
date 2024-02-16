import {signOut} from '../../auth/useAuth';
import {refreshTokenDataAction} from '../redux/actions';
import {store} from '../redux/useRedux';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

type NewTokenData = {
  accessToken: string;
  idToken: string;
  expiry: number;
};

const getNewTokens = async (refreshToken: string) => {
  try {
    const request = await fetch(
      `https://us-central1-coral-406419.cloudfunctions.net/api/getNewTokens`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          refreshToken,
        }),
      },
    );
    const data = await request.json();
    return data as NewTokenData;
  } catch (e) {
    signOut();
  }
};

type AccessTokenData = TokenData & {
  authToken: string;
};

export const withTokens = async () => {
  console.log('withTokens');
  const fbUser = auth().currentUser!;
  const authToken = await fbUser.getIdToken();
  const userId = store.getState().data.myUserId;
  const {refreshToken, expiry} =
    store.getState().data.usermap[userId].refreshData;
  const now = Date.now();
  if (now > expiry) {
    const {expiry, accessToken, idToken} = (await getNewTokens(
      refreshToken,
    )) as NewTokenData;
    const tokenData: TokenData = {accessToken, idToken};
    store.dispatch(
      refreshTokenDataAction({newExpiry: expiry, data: tokenData}),
    );
    console.log('withTokens refreshed', tokenData);
    return {...tokenData, authToken} as AccessTokenData;
  }

  const tokenData = store.getState().data.tokenData!;
  console.log('withTokens unrefreshed', tokenData, expiry - now);
  return {...tokenData, authToken} as AccessTokenData;
};

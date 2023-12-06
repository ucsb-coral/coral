import {signOut} from '../../auth/useAuth';
import {refreshTokenDataAction} from '../redux/actions';
import {store} from '../redux/useRedux';

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

export const withTokens = async () => {
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
    return tokenData;
  }
  const tokenData = store.getState().data.tokenData!;
  return tokenData;
};

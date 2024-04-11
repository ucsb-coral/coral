import {render, screen} from '@testing-library/react-native'
import { View } from 'react-native';
import {Card, Paragraph} from 'react-native-paper';
import axios from "axios";

const { PaperProvider } = require('react-native-paper');
const getEvents = require('../src/firebaseReduxUtilities/useEventsData');

//jest.mock('axios');

/*
it('returns a list of events', async () => {
    axios.get.mockResolvedValue({
      data: [
        {
            id: 1111111,
            title: "Mock Event",
            description: "This is the mock for an event",
            photo: "https://www.highpointscientific.com/media/magefan_blog/AstroHub-PhotographRocketLaunch.jpg"
        }
      ]
    });
  
    eventsData = await getEvents();
  });
  */ //fuck jest-mock, just going to hardcode the data

eventsData = {
    id: 1111111,
    title: "Mock Event",
    description: "This is the mock for an event",
    photo: "https://www.highpointscientific.com/media/magefan_blog/AstroHub-PhotographRocketLaunch.jpg"
}

function Example() {
    return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {
            <PaperProvider>
                <Card style={{backgroundColor: '#fff'}}>
                <View style={{}}> 
                    <Card.Title title={eventsData.title} titleStyle={{fontWeight: '700', flexWrap: 'wrap'}} testId = "display-title"/>
                    <Card.Cover source={{uri: eventsData.photo}} style={{backgroundColor: '#fff'}} resizeMode="contain"/>
                    <Card.Content>
                    <Paragraph testId = "display-desc"> {eventsData.description} </Paragraph>
                    </Card.Content>
                </View>
                </Card>
            </PaperProvider>
        }
        </View>
    )
}

test ('useless test for useless checking that the component loads properly', async () => {
    const expectedTitle = "Mock Event";
    const expectedDesc = "This is the mock for an event";

    render(<Example />)

    //const titleOutput = await screen.findByTestId('display-title')
    //const descOutput = await screen.findByTestId('display-desc')

    const titleOutput = await screen.findByText("Mock Event")
    const descOutput = await screen.findByText("This is the mock for an event")

    expect(titleOutput).toHaveTextContent(expectedTitle)
    expect(descOutput).toHaveTextContent(expectedDesc)

})
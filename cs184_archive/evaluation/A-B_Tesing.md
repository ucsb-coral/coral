# A/B Testing

## Condition
- **Lead**: Wenjin Li is responsible for this A/B testing.
- **Version A**: Based on the main branch, commit `d65c4da`.
- **Version B**: Varies from Version A by altering different features.
- **Participants**: 5 anonymous users, referred to as `user1`, `user2`, `user3`, etc.
- **Anonymity & Knowledge**: Participants wish to remain anonymous and understand the basic app usage but are unaware of which version they are using.

## Experiment
*Note*: "I" refers to Wenjin Li; "they" to `user1`, `user2`, `user3`, etc. Each round involves 3 different users on Version A and 2 on Version B, using the app simultaneously. I record their actions and post-experiment, `reveal` the version differences and then gather feedback. Experiments focus on features likely to be modified in the future.

### Experiment 1
- **Changes in Version B**: Lighter color for the left-side chat bubbles and added frame for user avatars (currently it is a placeholder framwork). Users restricted to a single chat-room page.
- **Task**: Users instructed to send a message.
- **Outcome**: All could send messages.
- **Feedback on Version Differences**:
  - (in this round, since it is they first time they use this app, they are not familiar with the app, so I think it is better to let them talk to each other and discuss the differences between the two versions.)
  - **Chat Bubble Color**: Preference for lighter color for its clarity.
  - **Avatar Frames**: Users of Version B liked the frames for easier identification, especially in cases of identical names.

### Experiment 2
- **Changes in Version B**: Removed pop-up tips after selecting a class in the `Schedule` page.
- **Task**: Users instructed to join a new class and send a message in that class's chat page.
- **Outcome**: All could join a new class and send a new message.
- **Feedback on Version Differences**:
  - **Version A Users**: 
    - `user1`: Found the tip box useful for quick joining and entry into chat-room.
    - `user2`: Agreed on the usefulness of the tip box.
    - `user3`: Felt the tip box duplicated the function of the `chat` page's join button, which seemed redundant.
  - **Version B Users**:
    - `user4`: Lacked the tip box, leading to a more cumbersome process of joining classes.
    - `user5`: Found the process of joining a class without the tip box less intuitive. It required extra steps, which could be confusing for those not familiar with the app's layout.

### Experiment 3
- **Changes in Version B**: Removed haptic feedback when tapping the back button in the top-left corner.
- **Task**: Users asked to freely explore the app.
- **Feedback on Version Differences**:
  - **Version A Users**: 
    - `user1`: Found haptic feedback useful to confirm back button press.
    - `user2`: Felt the feedback was too intense, preferring a subtler approach.
    - `user3`: Deemed the feedback unnecessary as it's not a common feature in other apps.
  - **Version B Users**:
    - `user4`: Finding it useful especially in chat settings.
    - `user5`: Noticed the lack of haptic feedback on the back button.
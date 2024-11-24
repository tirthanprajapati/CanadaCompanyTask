# CanadaCompanyTask

## Project Setup Instructions

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/CanadaCompanyTask.git
   cd CanadaCompanyTask
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```
   or if you are using yarn:
   ```sh
   yarn install
   ```

3. **Start the development server:**
   ```sh
   npm start
   ```
   or if you are using yarn:
   ```sh
   yarn start
   ```

4. **Run on Android:**
   ```sh
   npm run android
   ```
   or if you are using yarn:
   ```sh
   yarn android
   ```

5. **Run on iOS:**
   ```sh
   npm run ios
   ```
   or if you are using yarn:
   ```sh
   yarn ios
   ```

6. **Run on Web:**
   ```sh
   npm run web
   ```
   or if you are using yarn:
   ```sh
   yarn web
   ```

## Brief Explanation of Approach and Challenges Faced

### Approach

The project is built using React Native and Expo, with the following key components:
- **MainScreen**: The main screen where users can input their mood and get AI insights.
- **MoodHistory**: A component that displays the user's mood history using a line chart.
- **MoodService**: A service that handles storing mood entries and fetching AI insights.

### Challenges Faced

1. **Version Compatibility**: Ensuring compatibility between different versions of dependencies, especially with the new architecture enabled in Expo SDK 52.
2. **State Management**: Managing the state of the application, particularly when dealing with asynchronous operations like fetching AI insights and storing mood entries.
3. **UI/UX**: Designing a user-friendly interface that is both functional and visually appealing.

## Assumptions and Decisions Made During Development

1. **AI Insights**: The AI insights are simulated and not fetched from a real backend service. This was done to simplify the development process.
2. **Data Storage**: Mood entries are stored locally using `@react-native-async-storage/async-storage`. This decision was made to avoid the complexity of setting up a backend service.
3. **Expo SDK 52**: The project uses Expo SDK 52 with the new architecture enabled for better performance and future-proofing.

## Additional Information

- **Expo SDK**: The project uses Expo SDK 52, which includes the latest features and improvements.
- **React Native Paper**: The UI components are built using React Native Paper for a consistent and modern look.
- **React Native Chart Kit**: The mood history chart is implemented using React Native Chart Kit.

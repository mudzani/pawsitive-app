# Pawsitive Pet Academy

## Project overview

## About Pawsitive Pet Academy

Pawsitive Pet Academy makes exploring pet-care education simple and accessible. The app allows users to discover available courses, learn more about each programme, review course fees, estimate the cost of selecting multiple courses, and find the academy’s contact information—all in one place.

Built with **React Native and Expo**, the application uses **Expo Router** to navigate between screens. The project is configured to run with Expo Go, allowing users to preview the app on a compatible mobile device without requiring a separate native Android or iOS project in the repository.

This README explains how to set up and run the application using Expo Go or an Android Studio emulator, with step-by-step instructions .

## Features

- **Home screen:** introduces the academy and highlights four courses.
- **Course catalogue:** shows seven courses, with a search field and filters for all courses, professional programmes, and short courses.
- **Course information:** displays each course's overview, duration, fee, entry requirements, and learning topics.
- **Fee calculator:** lets users select courses and calculate a subtotal, course-count discount, 15% VAT, and total. The listed discount rates are 0% for one course, 5% for two, 10% for three, and 15% for four or more.
- **About screen:** describes the academy, its values, and its course categories.
- **Contact screen:** displays contact options and a form. The form validates required fields and consent, then prepares an email draft for the user to review and send. It does not send the message automatically or submit it to a project backend.

## Technology stack

| Technology | How it is used |
| --- | --- |
| React Native | Builds the mobile user interface. |
| TypeScript | Adds static type checking to the application code. |
| Expo SDK 57 | Provides the React Native development tools and Expo modules. |
| Expo Router | Provides file-based navigation; the route files are in `app/`. |
| React 19 | Renders the application interface. |
| npm | Installs the dependencies recorded in `package-lock.json`. |
| ESLint with `eslint-config-expo` | Checks the project using the configured lint command. |

The project uses `expo-image` for displayed images and `expo-linking` for opening email and phone links. These are included in the project's Expo SDK 57 dependency set.

## What You Need Before Getting Started

For either run method, install:

- [Node.js](https://nodejs.org/) with npm. Use a current Node.js LTS release. The project does not specify an exact Node.js or npm version.
- [Visual Studio Code](https://code.visualstudio.com/) (or another editor).
- A copy of this project on your computer.

For the Android Studio Emulator method, also install [Android Studio](https://developer.android.com/studio) and its Android SDK and Emulator components. For the physical-device method, use an Android phone that can install the current Expo Go app from Google Play.

## Project setup and dependency installation

1. Open Visual Studio Code.
2. Select **File > Open Folder...** and open the project folder, `pawsitive-app`. It is the folder that contains `package.json` and `package-lock.json`.
3. Open **Terminal > New Terminal** in Visual Studio Code. The terminal should start in the project folder. If it does not, change to that folder before running the commands below.
4. Install the exact dependency versions recorded in the npm lockfile:

   ```sh
   npm ci
   ```

   Wait for npm to finish. It should complete without an error and install the dependencies into `node_modules/`.



## Running the application with Android Studio Emulator

Android Studio supplies and manages the Android Virtual Device (AVD), which is a simulated Android phone running on your computer. Expo supplies the development server and opens the app in Expo Go on that virtual device. You do not need to create a separate native Android Studio project for this Expo application.

1. **Install and open Android Studio.** Complete its initial setup so the Android SDK and Android Emulator components are installed.
2. **Open Device Manager.** In Android Studio, select **Tools > Device Manager**. Depending on the Android Studio version, Device Manager may also be available from the welcome screen.
3. **Create or select an AVD.** If you do not already have one, select **Create Virtual Device**, choose a phone device profile, select an available Android system image, and finish the setup. You only need to do this once.
4. **Start the virtual device.** In Device Manager, click the play/start icon next to the AVD. Wait until Android has finished booting and the emulator's home screen is visible.
5. **Open the project in Visual Studio Code** and open a new terminal from **Terminal > New Terminal**. Make sure the terminal is in the `pawsitive-app` project folder.
6. **Open the project terminal and enter**:

   ```sh
   npx expo start
   ```

  When Expo starts, press **a** on your keyboard.

Wait for the Pawsitive Pet Academy app to open in the Android emulator.

That's it! You can now use the app in the emulator.

Keep the terminal open while using the app. When you finish, press Ctrl + C in the terminal to stop Expo.

Android Studio and Expo have different roles: Android Studio provides the emulator and Android SDK tools; Expo starts the JavaScript development server and launches the project in Expo Go. 

## Running the application with Expo Go on a physical device

Expo Go is an app installed on a physical phone that can run compatible Expo projects. It is not the Android Studio emulator: the emulator simulates a phone on your computer, while Expo Go runs on your real phone.

1. On your Android phone, install **Expo Go** from the [official Google Play listing](https://play.google.com/store/apps/details?id=host.exp.exponent).
2. Connect the phone and computer to the same Wi-Fi network. Avoid guest Wi-Fi or network settings that isolate devices from one another.
3. Open the `pawsitive-app` project in Visual Studio Code and open **Terminal > New Terminal** in the project folder.
4. Enter the following :

   ```sh
   npx expo start
   ```

    Leave the terminal open and wait for Expo to show its QR code.
5. Open Expo Go on the phone and use its QR-code scan option to scan the code displayed in the terminal. If prompted, allow the phone camera to access the code.
6. Wait while Expo Go downloads the development bundle. The Pawsitive Pet Academy home screen should appear on the phone.


   
7. When finished, return to the Expo terminal and press **Ctrl+C** to stop the development server.

The project explicitly starts in Expo Go mode (`--go`) and its used Expo modules are available in Expo Go for SDK 57. A custom development build is not configured or required by the current source. If native modules that are not included in Expo Go are added later, Expo Go will not be sufficient; the project would need a development build.

## Application Testing and Emulator Evidence

The following images were supplied with the project request and copied into `docs/screenshots/` without changing their filenames or contents. They show the app displayed in an Android emulator. They provide visual evidence of the displayed screens at the time the images were captured; they do not prove that every interaction, calculation, or contact action works.

| Test case | Expected result | Actual result | Status |
| --- | --- | --- | --- |
| Display the home screen | Academy home content is visible. | The supplied emulator photos show the home screen. | Visual evidence available; interaction not independently retested. |
| Browse courses and open a course | The catalogue and a course detail page are displayed. | The supplied photos show the catalogue and a Canine Obedience Training detail page. | Visual evidence available; search and navigation not independently retested. |
| Calculate selected course fees | The calculator shows the selected courses, discount, VAT, and total. | The supplied photos show the fee-selection screen with no courses selected; no calculated summary is shown. | **Not yet verified.** Select courses, tap **Calculate**, and check the subtotal, applicable discount, VAT, total, and reset action. |
| Search and filter the course list | Search text and course-type filters update the visible courses. | No supplied image demonstrates these interactions. | **Not yet verified.** Try a matching and non-matching search and each course-type filter. |
| Use contact options and form | Contact links open the appropriate app; a valid form prepares an email draft. | No supplied image demonstrates these actions. | **Not yet verified.** Test the links and form on a device with an email app; confirm the draft is not sent until you send it yourself. |

### Supplied emulator screenshots

![Pawsitive Pet Academy home screen displayed in the Android emulator](docs/screenshots/Pasted%20Image.jpe)

*Home screen with the academy introduction and featured courses.*

![Featured course cards and home-screen actions displayed in the Android emulator](docs/screenshots/Pasted%20Image%202.jpe)

*Home screen scrolled to featured professional courses and the fee/contact actions.*

![Course catalogue displayed in the Android emulator](docs/screenshots/Pasted%20Image%203.jpe)

*Course catalogue showing the search field, course-type filters, and course cards.*

![Canine Obedience Training detail page displayed in the Android emulator](docs/screenshots/Pasted%20Image%204.jpe)

*Course detail page showing the course overview and learning topics.*

![Fee calculator course-selection screen displayed in the Android emulator](docs/screenshots/Pasted%20Image%205.jpe)

*Fee calculator before any courses are selected.*

![Fee calculator course list displayed in the Android emulator](docs/screenshots/Pasted%20Image%206.jpe)

*A second photo of the fee-selection screen; it also shows no courses selected.*



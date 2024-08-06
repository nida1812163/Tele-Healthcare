
-Project Title: Tele-HealthCare System


-Group Members:
1) Laiba Abid, 1812155
2) Nida Nadeem, 1812163


-Required Software Installation:
1) Xampp 
2) Visual Studio Code
3) Node.js
4) Android Studio


-Steps on how to deploy the project:
1) After installing all the required software, open xampp.
2) In xampp, make sure that the port for apache is 1545 and 8080, and the port for mysql is 3306.
3) In xampp, start the apache and mysql
4) Copy Paste the 'Tele_HealthCare_System' file in 'C:\xampp\htdocs'. 
5) Open the browser and enter the URL 'http://localhost:8080/phpmyadmin/'
	a) Click on the 'Import'.
	b) Click on 'Choose File' and then select the 'telehealth' SQL file.
	c) Click on 'Go'
6) Open the browser and enter the URL 'https://firebase.google.com/'
	a) Click on 'Get Started'.
	b) Click on 'Add Project'.
	c) Follow the instructions that would be displayed on the website.
	d) After creating the project, click on the android icon.
	e) Continue from step 10 part a to part b, and then copy the package name written after the word 'package'.
	f) Paste the package name where it is required in the browser.
	g) Click on 'Register app'.
	h) Follow the instructions shown on the website.
	i) Now click on Build -> Realtime Database, given in the sidebar.
	j) Click on 'Create Database' and then start it in test mode.
	K) Add these two, 'chat' and 'Videos', in the realtime database.
	L) Now click on Build -> Storage, given in the sidebar.
	M) Click on 'Get Started' and then start it in test mode.
	N) Create a folder named 'Videos'.
7) Open visual studio code and follow the following steps to run the website,
	a) Click on File -> Add folder to workspace, and then select the 'Official Tele-HealthCare System' folder.
	b) Open two new terminals by clicking on, Terminal -> New Terminal.
	c) In the first temrninal, type 'cd Client' and press enter to access the Client folder.
	d) Then type 'npm start' in the first terminal and press enter to run the client side.
	e) In the second temrninal, type 'cd Server' and press enter to access the Server folder.
	f) Then type 'npm install' in the second terminal and press enter to install the necessary packages.
	g) Then type 'nodemon' in the second terminal and press enter to run the backend.
	h) Make sure you have access to the internet.
	i) Open the browser and then type the URL 'http://localhost:3000/'.
	j) Now you have accessed the website, for further details regarding on how to use the features of the website, please read the user manual given in the FYP Report named "Tele-HealthCare System".
8) Open the command prompt on your PC, and then type 'ipconfig' and press enter.
9) Copy the IPv4 address from the command prompt.
10) Open Android Studio and follow the following steps to run the android application,
	a) Click on File -> Open, and then select the 'TeleHealthCareApp' folder.
	b) Open the Database.java class and then assign the IPv4 address, that you have copied from the command prompt, to the String 'ip' variable by pasting the IPv4 address between the double inverted commas.
	c) Make sure you have access to the internet.
	d) Click on Tools -> Device Manager.
	e) After opening the device manager, click on 'Create device' and then follow the instructions that would be displayed in android studio.
	f) After creating the device, click on the play icon button that is shown in front of the device in the device manager.
	g) Now the android application would successfully be running on the emulator.
	h) For futher details regarding on how to use the features of the android application, please read the user manual given in the FYP Report named "Tele-HealthCare System".



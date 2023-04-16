## Instructions to get started with Tejas Backend:

1. Install Python on your system. Version:3.8+. Make sure Python is installed on PATH environment variable so that python can be run from cmd.
2. Verify if python is installed on cmd by opening cmd and typing ``python --v``
3. If python is verified on cmd, then create a virtual environment as follows: ``python -m venv <name/path of virtual environment>``. This creates a folder with specified name in the specified path or in the current directory of cmd depending on the argument.
4. To activate the virtual environent type: ``<Name/Path of VE>\Scripts\activate``
5. After activation, to install the backend type: ``pip install webssh_embedded``. This should install the backend with required packages.
6. Then, to run the backend, type: ``wssh --xsrf=False``
7. To verify if backend is running go to browser and type: ``127.0.0.1:8888/static/js/iframetest.html``.
8. Form will appear to enter SSH credentials of remote machine. REMOTE MACHINE MUST BE LINUX BASED AND MUST HAVE SSH SERVICE RUNNING. (To run ssh service in Linux install openssh server and start the service

Eg. In Ubuntu, Debian etc; ``sudo apt-get install openssh-server`` and ``sudo service ssh start``)After submitting them, terminal should appear. Now commands can be typed in text input.

9. To look at the complete application, install nodejs. Then clone this repository.
10. Run npm install in the cloned repo. If that didnt work out use npm install --force
11. Run npm start to start the app.
12. Same form appears to enter SSH credentials. If direct access is required then the iframe src in Terminal1.tsx in components should be as follows:

http://localhost:8888?hostname=<hostname>&&username=<username>&&password=<base_64_encoded>

Hostname: Remote machine IP.

username: remote machine username

password: remote machine password in base 64

To obtain remote machine password in base 64;

``echo -n '<remote machine password>' | base64``

# [Secret Shed](https://ikigai-p9nl.onrender.com/)

Secret Shed is a minimalistic, scalable blog web app, which can be used to publish blogs written with additional features of markdown.
Because of its privacy-related liberations, we keep the user information encrypted.

For privacy policy, visit [this link](https://secretshed.netlify.app/).

- **CRUD:** Add, retrieve, update, delete, all according to your needs.
- **Save every bit:** A `save as pdf` feature has been added with the latest release which allows users to save their content as PDFs.

![screenshot](https://cdn.statically.io/gh/thatsameguyokay/images/main/ikigai.png)

- **Stay anonymous:** Nobody gets to know the authors. Everything is encrypted and this is what we get on the backend.
<div align="center"><img src="https://user-images.githubusercontent.com/76242518/209463298-316c4483-1c8e-429c-a438-09fa39f1c30b.png"></div>

- **Share articles with a public link:** After you've done editing your content, you can now share it with a single click. A public link will be created and pasted on clipboard within moments.
- **Encrypted pdfs:** The downloaded pdf is anti-OCR, which makes it almost impossible for the text to be copied and pasted.
- **Fast retrieval:** Low server latency and hence fast retrieval.
- **Full markdown support:** Write and engage in markdown, just like all other blog sharing websites.

![image](https://user-images.githubusercontent.com/76242518/183030652-415b0da3-0b8b-4e3f-bcec-9dbd1a92cffe.png)

## Installation

Follow the steps to install the application to your local machine:

- Fork and clone [this](https://github.com/sambhavsaxena/secret-shed) repository make an instant copy of the content.
- Alternatively, you can download the source and set it up with Github Desktop.
- Open the root folder in the code editor you prefer, and run the following commands:

1. npm install
2. cd ./frontend/ && npm i
3. cd.. && npm run dev, already configured in [package.json](https://github.com/sambhavsaxena/secret-shed/blob/main/package.json).

- Set the environment variables from the mongoDB server configurations and configure your own password for verification through the database.
- The environment variables can be located through CLI installation via NPM.

### Common issue faced while installation

'''
node:internal/modules/cjs/loader:488
throw e;
'''

This could occur due to discrepencies with various versions of Node.

How to fix: Delete the `package-lock.json` file and reinstall.

Better fix: To containerize the repository with Node environment and pull using Docker.

## To-do

- Make the app responsive.
- Implement pseudo-fetch algorithm in the `getAll()` function of [this](https://github.com/sambhavsaxena/secret-shed/blob/main/backend/controllers/articleController.js) file.
- Deploy on a better alternative to Heroku.

## Documentation

You can find the privacy policy [on this page](https://secretshed.netlify.app/).

Check out the [Getting Started](https://reactjs.org/docs/getting-started.html) page for a quick overview of the project structure.

You can improve it by sending pull requests to [this repository](https://github.com/sambhavsaxena/secret-shed).

## Contributing

The main purpose of this repository is to continue evolving React core, making it faster and easier to use. Development of React happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving React.

### Code of Conduct

Secret Shed has adopted a Code of Conduct that we expect project participants to adhere to. Please read [the full text](https://code.fb.com/codeofconduct) so that you can understand what actions will and will not be tolerated.

### Contributing Guide

Read the React's [contributing guide](https://reactjs.org/contributing/how-to-contribute.html) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to React, or overall MERN.

### Good First Issues

To help you get your feet wet and get you familiar with our contribution process, we have a list of [good first issues](https://github.com/sambhavsaxena/secret-shed/labels/good%20first%20issue) that contain bugs which have a relatively limited scope. This is a great place to get started <3.

### License

[MIT](./LICENSE).

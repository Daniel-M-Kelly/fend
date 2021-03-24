// Import the js file to test
import { initialData } from "../src/client/js/formHandler.js"


//import API call
const sendData = require("../src/server/index")

const fetch = require('node-fetch');

jest.mock('fetch');

// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing the retrieval of initial data when loading or re-loading the page", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("A function should return a json object", async () => {
           // Define the input for the function, if any, in the form of variables/array
           // Define the expected output, if any, in the form of variables/array
           // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output
           // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher
            fetch.get.mockResolvedValue({
            data: [
            {
                location: 'vancouver',
            }]
            })

            const res = await initialData();
            expect(res.location).toEqual('vancouver');
})});
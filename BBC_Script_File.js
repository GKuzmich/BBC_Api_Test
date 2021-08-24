
    const chai = require('chai')
    var expect = chai.expect;    // Using Expect style
    const url = "https://testapi.io/api/ottplatform/media"

    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', url, false);
    let start = Date.now();
    xhttp.send();
    var jsonResponse = JSON.parse(xhttp.responseText);
    let end = Date.now();


// Scenario 1: Status code is 200 and response time below 1000ms.
// Both assertions should pass

    it("1. HTTP status code of the response is 200 and response time is below 1000 milliseconds", function () {
        expect(xhttp.status).to.equal(200) && expect(end - start).to.below(1000);
    });

// Scenario 2: “id” field is never null or empty(“”) for all 14 items present in the data array
// and  “segment_type” field for every track is always “music”.
// Both assertions should pass

    it("2. ID field is never empty nor null and 'Segment_type' field for every track is 'music'", function () {
        jsonResponse.data.forEach(element => expect(element.id).to.not.eql("") && expect(element.id).to.not.be.null) &&  jsonResponse.data.forEach(element => expect(element.segment_type).to.eql("music"));
    });

// Scenario 3: the “primary” field in “title_list” is never null or empty(“”) for any track
// Assertion should pass

    it("3. 'Primary field' in 'title_list' is never empty nor null", function () {
        jsonResponse.data.forEach(element => expect(element.title_list.primary).to.not.eql("") && expect(element.id).to.not.be.null)
    });

// Scenario 4: only one track in the list has “now_playing” field in “offset” as true
// Assertion should pass

    it("4. Only one track in the list has 'now_playing' field in 'offset' as true", function () {
        var n = 0;
        jsonResponse.data.forEach(element => (element.offset.now_playing)?n++:n );
        expect(n).to.eql(1);
    });

// Scenario 5: verify the “Date” value
// Assertion should fail. The date in the api does not currently match today's date

    it("5. The response header 'date' is valid", function () {
        var tdy = new Date();
        var hdate = new Date(xhttp.getResponseHeader('Date'));
        expect(tdy).to.be.eql(hdate);
    });
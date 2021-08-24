Feature: Playlist Api Test

    Scenario:  The HTTP status code of the response is 200 and response time is below 1000ms
    Given GET request is sent to https://testapi.io/api/ottplatform/media
    When HTTP response is recieved
    Then HTTP status code of the response is 200
    And the response time of the request is below 1000 milliseconds

    Scenario: The “id” field is never null or empty(“”) for all 14 items present in the data array and the “segment_type” field for every track is always “music” 
	Given GET request is sent to https://testapi.io/api/ottplatform/media
	When Every track's "id" field is accessed 
    Then The “id” field is never null or empty(“”)
    And The “segment_type” field for every track is always “music”

    Scenario: The “primary” field in “title_list” is never null or empty(“”) for any track
    Given GET request is sent to https://testapi.io/api/ottplatform/media
    When Every track's "primary" field in "title_list" is accessed
	Then The “primary” is never null or empty(“”)

    Scenario: Only one track in the list has “now_playing” field in “offset” as true
    Given GET request is sent to https://testapi.io/api/ottplatform/media
	When Each track's "now_playing"	field in "offset" is accessed
    Then Only one track in the list has “now_playing” field as true

    Scenario: In the response headers, the “Date” value is valid
    Given GET request is sent to https://testapi.io/api/ottplatform/media
    When "date" value in the response headers is accessed
    Then the "date" value is valid

    Scenario: "primary" and "secondary" fields combination is unique for each track
    Given GET request is sent to https://testapi.io/api/ottplatform/media
    When "primary" and "secondary" fields in "title_list" of each track are accessed 
    Then Combination of "primary" and "secondary" fields is uniquie for each track

    Scenario: There are at Least 2 Nirvana Songs in Playlist
    Given GET request is sent to https://testapi.io/api/ottplatform/media
    When "primary" field in "title_list" of each track is accessed
    Then At least 2 Nirvana songs are present

    Scenario: In response headers "Access-Control-Allow-Methods" "DELETE" is not available
    Given GET request is sent to https://testapi.io/api/ottplatform/media
    When "Access-Control-Allow-Methods" in response headers are accessed
    Then "DELETE" is not one of the available methods

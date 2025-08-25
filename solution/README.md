# Intended solution

1. Try logging in
2. Figure out that it is slower when more characters are correct
3. Bruteforce the username and password, character by caracter
   a. Only accept a new valid character if the server responds more slowly when that character is added to either the username or password
   b. If the server doesn't respond more slowly to any request, the username or password is complete
4. Use the username and password to retrieve the flag

Solution script takes >25 seconds to complete depending on connection to server and value of timeout in solve script.

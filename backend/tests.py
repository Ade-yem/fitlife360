import requests

url = 'https://api.api-ninjas.com/v1/exercises'

querystring = {"muscle":"biceps"}

headers = {
	"X-Api-Key": "2P2eLGL0Kvzd0MRlBTgiSA==TQJDJmacKQskCa2j",
}

response = requests.get(url, headers=headers)
                        # , params=querystring)

print(response.json())
import requests
import urllib.request
import time
from bs4 import BeautifulSoup
from flask import Flask, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS

app = Flask(__name__)
api = Api(app)

CORS(app)

COUNTRIES = {
    'US': ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DC", "DE", "FL", "GA", 
          "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", 
          "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", 
          "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", 
          "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"],
    'AR': [""],
    'AU': [""],
    'AT': [""],
    'BS': [""],
    'BE': [""],
    'BR': [""],
    'BG': [""],
    'CM': [""],
    'CA': [""],
    'CV': [""],
    'CN': [""],
    'HR': [""],
    'CU': [""],
    'CZ': [""],
    'CD': [""],
    'DM': [""],
    'DK': [""],
    'DO': [""],
    'EE': [""],
    'EG': [""],
    'FI': [""],
    'FR': [""],
    'GF': [""],
    'GA': [""],
    'GE': [""],
    'DE': [""],
    'GH': [""],
    'GR': [""],
    'GP': [""],
    'GY': [""],
    'HT': [""],
    'HU': [""],
    'IS': [""],
    'IE': [""],
    'IR': [""],
    'IL': [""],
    'IT': [""],
    'JM': [""],
    'JP': [""],
    'LV': [""],
    'LB': [""],
    'LT': [""],
    'LU': [""],
    'ML': [""],
    'MQ': [""],
    'MX': [""],
    'ME': [""],
    'MA': [""],
    'NL': [""],
    'NZ': [""],
    'NG': [""],
    'NO': [""],
    'PA': [""],
    'PL': [""],
    'PR': [""],
    'KR': [""],
    'MK': [""],
    'CG': [""],
    'RO': [""],
    'RU': [""],
    'LC': [""],
    'VC': [""],
    'SN': [""],
    'RS': [""],
    'SK': [""],
    'SI': [""],
    'ZA': [""],
    'SS': [""],
    'ES': [""],
    'SE': [""],
    'CH': [""],
    'TW': [""],
    'TT': [""],
    'TN': [""],
    'TR': [""],
    'VI': [""],
    'UA': [""],
    'GB': [""],
    'TZ': [""],
    'UY': [""],
    'VE': [""],
          }

@app.route('/', methods=['GET'])
def main():
    all_cities = []
    for country in COUNTRIES:
        for state in COUNTRIES[country]:
            url = "https://www.basketball-reference.com/friv/birthplaces.fcgi?country={}&state={}".format(country, state)
            response = requests.get(url)
            soup = BeautifulSoup(response.text, "html.parser")
            cities = []
            full_cities = []
            tagged_cities = [city for city in soup.findAll('td') if city.has_attr("data-stat") and city["data-stat"] == "birth_city"]
            for city in tagged_cities:
                cities += (city.contents)
            for city in cities:
                if state != "":
                    full_cities.append(city + ", {}".format(state))
                else:
                    full_cities.append(city + ", {}".format(country))
            all_cities += full_cities
    return jsonify({'cities' : all_cities})

if __name__ == '__main__':
    app.run(port=5002)



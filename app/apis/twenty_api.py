import os
import requests


class TwentyApi:
    def __init__(self):
        self.base_url = "http://localhost:3000/rest"
        self.token = os.getenv("TWENTY_API_KEY")

    def get_opportunities(self):
        end_point = f"{self.base_url}/opportunities"
        headers = {"Authorization": f"Bearer {self.token}"}
        response = requests.get(end_point, headers=headers)
        if response.status_code != 200:
            return []
        data = response.json()
        return data["data"]["opportunities"]

    def make_request(self, method, endpoint, entity: str, data=None):
        end_point = f"{self.base_url}{endpoint}"
        headers = {"Authorization": f"Bearer {self.token}"}
        response = requests.request(method, end_point, headers=headers, json=data)
        if response.status_code != 200:
            return None
        data = response.json()
        return data["data"][entity]

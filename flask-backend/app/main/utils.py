
import json

from flask import Response

from enum import Enum

import pytz
class OrderStatus(Enum):
    PENDING = 1
    SHIPPED = 2
    DELIVERED = 3

    @property
    def name(self):
        return self.name.lower()

tz = pytz.timezone('UTC')

def generate_error_response(message):
    error = json.dumps({ "error": message})
    return Response(error,mimetype="application/json")

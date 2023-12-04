from flask import Blueprint

main = Blueprint('main',__name__)

from . import customers, errors, authentication, medicine, medicine_categories,utils,orders,middleware,dose,manufacture,manufacture_code,medicine_inventory, image
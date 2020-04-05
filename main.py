from flask import Flask, render_template, jsonify, request
from pymongo import MongoClient

client = MongoClient('localhost', 27017)
db = client.dbsparta
app = Flask(__name__)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/order', methods=['POST'])
def order_post():
    receive_name = str(request.form['name']).strip()
    receive_object_num = str(request.form['objectNum']).strip()
    receive_address = str(request.form['address']).strip()
    receive_phone = str(request.form['phone']).strip()

    db.orders.insert_one({"name": receive_name, "object_num": receive_object_num,
                          "address": receive_address, "phone": receive_phone})
    return jsonify({'result': 'success', 'msg': '전송 완료!'})


@app.route('/order', methods=['GET'])
def order_get():
    return jsonify({'result': 'success', 'msg': '이 요청은 GET!', 'orders': list(db.orders.find({}, {"_id": 0}))})


if __name__ == '__main__':
    app.run("localhost", port=5000, debug=True)

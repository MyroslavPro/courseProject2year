from os import name
from flask import Flask, request, jsonify, abort
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy 
from marshmallow import ValidationError
from flask_cors import CORS
import json
from datetime import datetime

from marshmallow import fields, pre_load
from sqlalchemy import collate


#with open("holder_f.json") as f:
with open(r"C:\Users\Myrko\backend_alarm\holder_f.json") as f:
    HOLDER = json.load(f)

DB_URI = "mysql+pymysql://{user}:{password}@{host}:{port}/{db}".format(
    user=HOLDER["user"],
    password=HOLDER["password"],
    host=HOLDER["host"],
    port=HOLDER["port"],
    db=HOLDER["db"])

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = DB_URI
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
ma = Marshmallow(app)
CORS(app)


# USER init
class User(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(45), unique=True, nullable=False)
    motions = db.relationship('Motion', backref='user', lazy=True)
    power_supply = db.relationship('Power', backref='user', lazy=True)

    def __init__(self, name):
        self.name = name

class UserSchema(ma.Schema):
    class Meta:
        fields = ("id","name")
        

user_schema = UserSchema()
users_schema = UserSchema(many=True)


# motion detection
class Motion(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    status = db.Column(db.String(45), nullable=False) #, nullable=False
    created_at  = db.Column(db.DateTime, default=datetime.now(), nullable=False)  # , nullable=False should be a time of arriving of request and connecting to db, should be fine 
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False) # FK to user 

    def __init__(self, status, created_at, user_id):
        self.status = status
        self.created_at = created_at
        self.user_id = user_id # FK to user 


class MotionSchema(ma.Schema):
    class Meta:
        fields = ("id","status","created_at","user_id")

motion_schema = MotionSchema()
motions_schema = MotionSchema(many=True)



class Power(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    power_status = db.Column(db.Boolean, nullable=False) #, nullable=False
    created_at  = db.Column(db.DateTime, default=datetime.now(), nullable=False) 
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False) # FK to user 

    def __init__(self, power_status, created_at, user_id):
        self.power_status = power_status
        self.created_at = created_at
        self.user_id = user_id # FK to user 


class PowerSchema(ma.Schema):
    class Meta:
        fields = ("id","power_status","created_at","user_id")

power_supply_schema = PowerSchema()
power_supplys_schema = PowerSchema(many=True)



class Sound(db.Model):
    id = db.Column(db.Integer(), primary_key=True)
    value = db.Column(db.Integer(), nullable=False) #, nullable=False
    created_at  = db.Column(db.DateTime, default=datetime.now(), nullable=False) 
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False) # FK to user 

    def __init__(self, value, created_at, user_id):
        self.value = value
        self.created_at = created_at
        self.user_id = user_id # FK to user 


class SoundSchema(ma.Schema):
    class Meta:
        fields = ("id","value","created_at","user_id")

sound_schema = SoundSchema()
sounds_schema = SoundSchema(many=True)




#################### Routing ####################

@app.route("/")
def say_hi():
    return("Hi! This is an alarm system backend server")


########################### USER ##########################

#POST user to the db
@app.route("/user", methods=["POST"])
def add_user():
    try:
        data = UserSchema().load(request.json)
    except ValidationError:
        abort(400)
        
    new_user = User(**data)

    db.session.add(new_user)
    db.session.commit()
    print(user_schema.dump(new_user))
    return jsonify(User_schema.dump(new_user))


@app.route("/user", methods=["GET"])
def get_user():
    all_users = User.query.all()
    result = users_schema.dump(all_users)
    return jsonify(({"users":result}))

@app.route("/user/<id>", methods=["GET"])
def user_detail(id):
    user = User.query.get(id)
    
    if not User:
        abort(404)

    return user_schema.jsonify(user)

# Edit user, by replacing it
@app.route("/user/<id>", methods=["PUT"])
def user_update(id):
    user = User.query.get(id)

    if user is None:
        abort(404)

    try:
        data = UserSchema().load(request.json)
    except ValidationError:
        abort(400)

    for i in data:
        setattr(user, i, request.json[i])

    db.session.commit()
    return user_schema.jsonify(user)

@app.route("/user/<id>", methods=["DELETE"])
def user_delete(id):
    user = User.query.get(id)

    if User is None:
        abort(404)

    db.session.delete(user)
    db.session.commit()

    return user_schema.jsonify(user)

# Verify users name, if it is registered
@app.route("/user/verify/<user_name>", methods=["GET"])
def user_verify(user_name):
    user = User.query.filter_by(name = user_name).first()
    result = 1

    if user is None:
        abort(404)
        result = 0
        
     
    return jsonify(({"verifyStatus":result}))




#######################  MOTION  ######################

####### POST Motion detection #######
@app.route("/motion", methods=["POST"])
def add_motion():
    try:
        data = MotionSchema().load(request.json)
    except ValidationError:
        abort(400)
    
    # Handle data exceptions
    # try: 
    #     val = data.get("created_at")
    # except ValidationError:
    #     data["created_at"] = datetime.now()

    if ((data["created_at"] is None) or (data["created_at"] =="")):
        data["created_at"] = datetime.now()

    if ((data["user_id"] is None) or (data["created_at"] =="")):
        data["user_id"] = 1
    
    new_motion = Motion(**data)

    db.session.add(new_motion)
    db.session.commit()
    print(motion_schema.dump(new_motion))
    return jsonify(motion_schema.dump(new_motion))

# Get all motions
@app.route("/motion", methods=["GET"])
def get_motion():
    all_motions = Motion.query.all()
    result = motions_schema.dump(all_motions)
    print(result)
    return jsonify(({"motions":result}))

@app.route("/motion/<id>", methods=["GET"])
def motion_detail(id):
    motion = Motion.query.get(id)
    
    if not Motion:
        abort(404)

    return motion_schema.jsonify(motion)

# Edit motions
@app.route("/motion/<id>", methods=["PUT"])
def motion_update(id):
    motion = Motion.query.get(id)

    if motion is None:
        abort(404)

    try:
        data = MotionSchema().load(request.json)
    except ValidationError:
        abort(400)

    for i in data:
        setattr(motion, i, request.json[i])

    db.session.commit()
    return motion_schema.jsonify(motion)

#Delete motion record
@app.route("/motion/<id>", methods=["DELETE"])
def motion_delete(id):
    motion = Motion.query.get(id)

    if motion is None:
        abort(404)

    db.session.delete(motion)
    db.session.commit()

    return motion_schema.jsonify(motion)

# NEED A FILTER FOR TIME GRAB AND SELECTION BY USER NAME

# GET by user name
@app.route("/motion/search_by_name/<user_name>", methods=["GET"])
def motions_with(user_name):
    user = User.query.filter_by(name = user_name).first()

    # user = User.query.filter(collate(User.name, 'utf8_bin') == user_name).first()
    if user is None:
        abort(404)
    print(user.id)
    user_id = user.id
    motions_filtered = Motion.query.filter_by(user_id = user.id)
    result = motions_schema.dump(motions_filtered)
    return jsonify(({"motions":result}))

########################################
############## Power Status ####################
#########################################


####### POST Power status detection #######
@app.route("/power_status", methods=["POST"])
def add_power_status():
    try:
        data = PowerSchema().load(request.json)
    except ValidationError:
        abort(400)

    if ((data["created_at"] is None) or (data["created_at"] =="")):
        data["created_at"] = datetime.now()

    if ((data["user_id"] is None) or (data["created_at"] =="")):
        data["user_id"] = 1
    
    new_power_status = Power(**data)

    db.session.add(new_power_status)
    db.session.commit()
    print(power_supply_schema.dump(new_power_status))
    return jsonify(power_supply_schema.dump(new_power_status))

# Get all power_statuss
@app.route("/power_status", methods=["GET"])
def get_power_status():
    all_power_statuses = Power.query.all()
    result = power_supplys_schema.dump(all_power_statuses)
    print(result)
    return jsonify(({"power_statuses":result}))

@app.route("/power_status/<id>", methods=["GET"])
def power_status_detail(id):
    power_status = Power.query.get(id)
    
    if not Power:
        abort(404)

    return power_supply_schema.jsonify(power_status)

# Edit power_statuss
@app.route("/power_status/<id>", methods=["PUT"])
def power_status_update(id):
    power_status = Power.query.get(id)

    if power_status is None:
        abort(404)

    try:
        data = PowerSchema().load(request.json)
    except ValidationError:
        abort(400)

    for i in data:
        setattr(power_status, i, request.json[i])

    db.session.commit()
    return power_supply_schema.jsonify(power_status)

#Delete power status record
@app.route("/power_status/<id>", methods=["DELETE"])
def power_status_delete(id):
    power_status = Power.query.get(id)

    if power_status is None:
        abort(404)

    db.session.delete(power_status)
    db.session.commit()

    return power_supply_schema.jsonify(power_status)

# By user name get 
@app.route("/power_status/search_by_name/<user_name>", methods=["GET"])
def power_statuses_with(user_name):
    user = User.query.filter_by(name = user_name).first()
    if user is None:
        abort(404)

    power_statuses_filtered = Power.query.filter_by(user_id = user.id)
    result = power_supplys_schema.dump(power_statuses_filtered)
    return jsonify(({"power_statuses":result}))


###############################################################
######################### SOUND ###############################
###############################################################


####### POST Sound relational record #######
@app.route("/sound", methods=["POST"])
def add_sound():
    try:
        data = SoundSchema().load(request.json)
    except ValidationError:
        abort(400)

    if ((data["created_at"] is None) or (data["created_at"] =="")):
        data["created_at"] = datetime.now()

    if ((data["user_id"] is None) or (data["created_at"] =="")):
        data["user_id"] = 1
    
    new_sound = Sound(**data)

    db.session.add(new_sound)
    db.session.commit()
    print(sound_schema.dump(new_sound))
    return jsonify(sound_schema.dump(new_sound))


# Get all sounds
@app.route("/sound", methods=["GET"])
def get_sound():
    all_sounds = Sound.query.all()
    result = sounds_schema.dump(all_sounds)
    print(result)
    return jsonify(({"sounds":result}))


@app.route("/sound/<id>", methods=["GET"])
def sound_detail(id):
    sound = Sound.query.get(id)
    
    if not Sound:
        abort(404)

    return sound_schema.jsonify(sound)

# Edit sounds
@app.route("/sound/<id>", methods=["PUT"])
def sound_update(id):
    sound = Sound.query.get(id)

    if sound is None:
        abort(404)

    try:
        data = SoundSchema().load(request.json)
    except ValidationError:
        abort(400)

    for i in data:
        setattr(sound, i, request.json[i])

    db.session.commit()
    return sound_schema.jsonify(sound)

#Delete sound record
@app.route("/sound/<id>", methods=["DELETE"])
def sound_delete(id):
    sound = Sound.query.get(id)

    if sound is None:
        abort(404)

    db.session.delete(sound)
    db.session.commit()

    return sound_schema.jsonify(sound)

# By  user name, GET soundf
@app.route("/sound/search_by_name/<user_name>", methods=["GET"])
def sound_with(user_name):
    user = User.query.filter_by(name = user_name).first()
    if user is None:
        abort(404)

    user_id = user.id

    sounds_filtered = Sound.query.filter_by(user_id = user.id)
    result = sounds_schema.dump(sounds_filtered)
    return jsonify(({"sounds":result}))



if __name__ == "__main__":
    app.run(debug=True)
    #app.run(host='192.168.X.X',debug=True)

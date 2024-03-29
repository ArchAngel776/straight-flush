#!/bin/bash
mongosh -u $MONGO_ADMIN_NAME -p $MONGO_ADMIN_PASS <<EOF
use $MONGO_INITDB_TEST_DATABASE;
db.createUser({
    "user": "$MONGO_TEST_USER_NAME",
    "pwd": "$MONGO_TEST_USER_PASSWORD",
    "roles": [
        {
            "role": "readWrite",
            "db": "$MONGO_INITDB_TEST_DATABASE"
        }
    ]
});
EOF
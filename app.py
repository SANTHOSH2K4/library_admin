from flask import Flask,request,render_template,redirect,url_for
import mysql.connector
from datetime import datetime

app = Flask(__name__)

# MySQL connection parameters
config = {
    'user': 'root',
    'password': 'root',
    'host': 'localhost',
    'database': 'kcet'
}


def return_book(bid):
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    query = f"SELECT * FROM books "
    cursor.execute(query)
    rows = cursor.fetchall()
    bid_li=[]
    for i in rows:
        bid_li.append(i[0])
    print(bid_li)

    if(bid not in bid_li):
        return 'book ID not found!'

    query = f"SELECT * FROM books where id='{bid}'"
    cursor.execute(query)
    rows = cursor.fetchall()
    print(rows[0])
    isissued=rows[0][5]
    if(isissued==1):
        uid=rows[0][6]
        query=f"update books set isissued=0,issued_for='none',date='clear' where id='{bid}'"
        cursor.execute(query)
        conn.commit()
        query=f"select *from users where roll_no ='{uid}'"
        cursor.execute(query)
        rows=cursor.fetchall()
        issuance_limit=rows[0][2]
        issuance_limit=issuance_limit+1
        query=f"update users set issuancelimit={issuance_limit} where roll_no='{uid}'"
        cursor.execute(query)
        conn.commit()
        cursor.close()
        conn.close()
        return 'successfully returned'
    else:
        cursor.close()
        conn.close()
        return 'this book is not issued by anyone!'

@app.route('/admin')
def index():
    return render_template('index.html')

@app.route('/book')
def book_page():
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    query = f"SELECT * FROM books "
    cursor.execute(query)
    rows = cursor.fetchall()
    print(rows)
    return render_template('book.html',show_alert=False,res=rows)

@app.route('/student')
def stud_page():
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    query = f"SELECT roll_no,name,issuancelimit,tags FROM users "
    cursor.execute(query)
    rows = cursor.fetchall()
    return render_template('student.html',res=rows)

@app.route('/showhistory/',methods=['POST'])
def sol():
    id= request.form['value']
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    query=f"select track from users where roll_no='{id}'"
    cursor.execute(query)
    rows = cursor.fetchall()
    print(rows)
    data_str = rows[0][0]

    # Splitting the string into key-value pairs
    pairs = data_str.split(',')

    # Creating a list of tuples in the desired format
    result = [(pair.split('/')[0], pair.split('/')[1]) for pair in pairs if pair]


    return render_template('history.html',res=result)




@app.route('/proc_return',methods=['POST'])
def proc_return():
    print("hello from proc_return")
    bid=request.form['bookNumberReturn']
    resp=return_book(bid)
    print(resp)
    conn = mysql.connector.connect(**config)
    cursor = conn.cursor()
    query = f"SELECT * FROM books "
    cursor.execute(query)
    rows = cursor.fetchall()
    print(rows)
    
    return render_template('book.html', show_alert=True,res=rows,resp=resp)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8000, debug=True)
 
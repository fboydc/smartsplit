package main

import "database/sql"

func InitDB() (*sql.DB, error) {

	db, err := sql.Open("postgres", "user=postgres password=password dbname=cust_data sslmode=disable")
	if err != nil {
		return nil, err
	}
	DB = db
	return db, nil
}

func CloseDB(db *sql.DB) {
	db.Close()
}

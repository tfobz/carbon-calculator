use mongodb::bson::{doc, Document, };

#[macro_use]
extern crate rocket;

use rocket::fairing::AdHoc;
use rocket_cors::{AllowedHeaders, AllowedOrigins};
use rocket::http::Method;
use rocket::{get, routes};

mod config;
mod mdb;
mod shared;
mod crypto;
mod user;

#[get("/")]
pub async fn index() -> &'static str {
    "C02 Emissions"
}

#[launch]
async fn rocket() -> _ {
    println!("Initializing config...");
    let config_figment = config::get_figment().expect("Initializing config failed");

    let config: config::Config = config_figment.extract().expect("Initializing config failed");

    println!("Connecting to database...");
    let mongo = mdb::MongoDb::new(&config.db_connection, Some(String::from("MongoDB")), &config.db_name).await.expect("Creating DB pool failed");

    mongo.get_con().run_command(doc! { "ping": 1 }, None).await.unwrap();
    println!("Connected to mongodb");

    let allowed_origins = AllowedOrigins::all();

    let cors = rocket_cors::CorsOptions {
        allowed_origins,
        allowed_methods: vec![
		Method::Get,
		Method::Post,
		Method::Patch,
		Method::Put,
		Method::Delete,
		Method::Head,
		Method::Options].into_iter().map(From::from).collect(),
        allowed_headers: AllowedHeaders::all(),
        allow_credentials: true,
        ..Default::default()
    }
    .to_cors().unwrap();


    rocket::custom(config_figment)
        .mount("/", routes![
            index,
            user::register::register_route,
            user::login::login_route
        ])
        .register("/", vec![rocketjson::error::get_catcher()])
        .attach(AdHoc::config::<config::Config>())
        .attach(cors)
        .manage(mongo)
}

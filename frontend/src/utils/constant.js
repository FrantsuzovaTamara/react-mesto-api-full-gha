const STATUS = "development";
let BASE_URL;

if (STATUS === "production")  {
  BASE_URL = "https://api.mesto.by.frantsuzova.nomoredomains.work";
} else {
  BASE_URL = "http://localhost:3000"
}

export default BASE_URL;
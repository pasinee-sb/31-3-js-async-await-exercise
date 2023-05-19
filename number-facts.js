//Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON
//by including the json query key, specific to this API. Details.

let baseURL = "http://numbersapi.com";

class FavNum {
  constructor(num) {
    this.num = num;
  }
  async getFact() {
    let fact = await axios.get(`${baseURL}/${this.num}?json`);
  }
}

let num = new FavNum(4);
num.getFact();

//Figure out how to get data on multiple numbers in a single request.
// Make that request and when you get the data back,
//put all of the number facts on the page.
const favNumbers = [4, 45, 54];
async function multiNum() {
  let nums = await axios.get(`${baseURL}/${favNumbers}?json`);
  console.log(nums.data);

  $(".fav-nums").append(`<h1 style="color:red">Facts of FavNums</h1>`);
  $(".fav-nums").append(`<h1>${nums.data[4]}</h1>`);
  $(".fav-nums").append(`<h1>${nums.data[45]}</h1>`);
  $(".fav-nums").append(`<h1>${nums.data[54]}</h1>`);
}

multiNum();

// Use the API to get 4 facts on your favorite number. Once you have them all,
//put them on the page. It’s okay if some of the facts are repeats.

async function fourFacts() {
  let facts = await Promise.all([
    axios.get(`${baseURL}/4/math`),
    axios.get(`${baseURL}/4/date`),
    axios.get(`${baseURL}/4/trivia`),
    axios.get(`${baseURL}/4/year`),
  ]);
  $(".fav-num").append(`<h1 style="color:blue">Facts of FavNum</h1>`);
  $(".fav-num").append(`<h1>${facts[0].data}</h1>`);
  $(".fav-num").append(`<h1>${facts[1].data}</h1>`);
  $(".fav-num").append(`<h1>${facts[2].data}</h1>`);
  $(".fav-num").append(`<h1>${facts[3].data}</h1>`);
}

fourFacts();

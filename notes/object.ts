const continent = {
  name: '北アメリカ',
  us: {
    name: 'アメリカ合衆国',
    capitalCity: 'ワシントンD.C.',
  },
}
const {
  name: continentName,
  us: { name: countryName },
} = continent
console.log(continentName)
// => '北アメリカ'
console.log(countryName)
// => 'アメリカ合衆国'

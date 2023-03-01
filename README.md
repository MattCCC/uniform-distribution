# Uniform distribution on the surface of unit sphere example

This is just a sample of rectangular distribution implemented in TS. It's a solution I worked on couple years ago.

It was successfully deployed to production and used by millions of users.

## What is it?

In probability theory and statistics, the continuous uniform distribution or rectangular distribution is a family of symmetric probability distributions. The distribution describes an experiment where there is an arbitrary outcome that lies between certain bounds.

More info: https://en.wikipedia.org/wiki/Continuous_uniform_distribution

It can be used e.g. together with Haversine Formula - an equation important in navigation. It gives great-circle distances between two points on a sphere from their longitudes and latitudes. Furthermore, it is a part of spherical trigonometry & the Law of Haversines, relating the sides and angles of spherical "triangles".

## Example

One could implement a great-circle distance function, or use a library function, to show the great-circle distance between point A and B considering the Earth's Sphere, or a random points of interest (POIs) from a given latitude and longitude. In my example I calculate random distance from Point A given its latitude and longitude to a Point B using Continuous Uniform Distribution. I then use Haversine Formula to generate new latitude and longitude for Point B.

Lastly, for the purpose of the example I'm going to use Mersenne Twister general-purpose pseudorandom number generator (PRNG) developed in 1997 by Makoto Matsumoto [ja] (松本 眞) and Takuji Nishimura (西村 拓士). Its name derives from the fact that its period length is chosen to be a Mersenne prime.

More information: https://en.wikipedia.org/wiki/Mersenne_Twister

## Run

I wrapped it into a simple NPM build process. It's enough to install & build the module. It works in both Node and browser environments.

## Tests

I tested it on a napkin. I have to yet make some test cases. As you may notice, I wrapped up the testing lib, so we're getting there.

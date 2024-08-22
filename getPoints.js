// Import node-fetch using ES module syntax
import fetch from 'node-fetch';
import process from 'process';

// Get Bearer token from command line arguments
const token = process.argv[2];

if (!token) {
    console.error("Bearer token must be provided as an argument.");
    process.exit(1);
}

const url = "https://www.aeropres.in/api/atom/v1/userreferral/getpoint";
const headers = {
    "accept": "*/*",
    "accept-encoding": "gzip, deflate, br, zstd",
    "accept-language": "id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7",
    "authorization": `Bearer ${token}`,
    "cache-control": "no-cache",
    "content-type": "application/json",
    "origin": "chrome-extension://fpdkjdnhkakefebpekbdhillbhonfjjp",
    "pragma": "no-cache",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
};

async function getPoints() {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
        });

        if (response.ok) {
            const data = await response.json();
            const rewardPoint = data.data ? data.data.rewardPoint : {};

            // Calculate total points
            const totalPoints = (rewardPoint.points || 0) +
                                (rewardPoint.twitter_x_id_points || 0) +
                                (rewardPoint.discordid_points || 0) +
                                (rewardPoint.telegramid_points || 0);

            console.log("Script is running...");
            console.log(`ID             : ${rewardPoint._id}`);
            console.log(`Total Points    : ${totalPoints}`);
            console.log(`Active Streak   : ${rewardPoint.activeStreak}`);
        } else {
            console.log("Failed to fetch data.");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// Keep the connection alive and fetch points every 15 seconds
setInterval(getPoints, 15000);  // Wait 15 seconds before the next request

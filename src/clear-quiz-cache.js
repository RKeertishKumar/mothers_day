// Script to clear the quiz cache from localStorage
console.log("Clearing quiz cache from localStorage...");

// Check if localStorage is available
if (typeof localStorage !== 'undefined') {
  // Remove the quiz state from localStorage
  localStorage.removeItem('mothers-day-quiz');
  console.log("Quiz cache cleared successfully!");
} else {
  console.error("localStorage is not available in this environment.");
}

// Also clear any other potential caches
if (typeof caches !== 'undefined') {
  caches.keys().then(cacheNames => {
    cacheNames.forEach(cacheName => {
      caches.delete(cacheName);
      console.log(`Cache '${cacheName}' deleted.`);
    });
  }).catch(error => {
    console.error("Error clearing caches:", error);
  });
} else {
  console.log("Cache API is not available in this environment.");
}

console.log("Cache clearing complete. Please refresh the page to see the updated quiz questions.");

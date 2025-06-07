// A simple function to greet a user
function greet(name: string): string {
  return `Hello, ${name}! Welcome to Success Sphere.`;
}

// Example usage of the greet function
const userName = "Kamau";
console.log(greet(userName));

// Export the greet function for use in other modules
export { greet };
function a() {
  console.log('is this the global object? ' + (global === this));
}

a();
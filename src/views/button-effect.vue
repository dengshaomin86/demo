<template>
  <div class="wrapper">
    <button class="btn1">Hover me</button>
    <div class="btn-container">
      <button class="btn2">Hover me</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'button-effect'
  };
</script>

<style scoped lang="scss">
  .wrapper {
    padding: 100px;
    button {
      margin: 20px;
    }
  }
  .btn1 {
    border: 0;
    background: none;
    text-transform: uppercase;
    color: #4361ee;
    font-weight: bold;
    position: relative;
    outline: none;
    padding: 10px 20px;
    box-sizing: border-box;
    &::before, &::after {
      box-sizing: inherit;
      position: absolute;
      content: '';
      border: 2px solid transparent;
      width: 0;
      height: 0;
    }
    &::before {
      top: 0;
      left: 0;
    }
    &::after {
      bottom: 0;
      right: 0;
    }
    &:hover::before, &:hover::after {
      width: 100%;
      height: 100%;
    }
    &:hover::before {
      border-top-color: #4361ee;
      border-right-color: #4361ee;
      transition: width 0.3s ease-out, height 0.3s ease-out 0.3s;
    }
    &:hover::after {
      border-bottom-color: #4361ee;
      border-left-color: #4361ee;
      transition: border-color 0s ease-out 0.6s, width 0.3s ease-out 0.6s, height 0.3s ease-out 1s;
    }
  }
  .btn-container {
    position: relative;
    .btn2 {
      border: 0;
      border-radius: 50px;
      color: white;
      background: #5f55af;
      padding: 15px 20px 16px 60px;
      text-transform: uppercase;
      background: linear-gradient(to right, #f72585 50%, #5f55af 50%);
      background-size: 200% 100%;
      background-position: right bottom;
      transition:all 2s ease;
      &:hover {
        background-position: left bottom;
      }
    }
    svg {
      background: #f72585;
      padding: 8px;
      border-radius: 50%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }
</style>

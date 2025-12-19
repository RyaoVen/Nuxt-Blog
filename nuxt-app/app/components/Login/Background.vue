<template>
  <div :class="$style.backgroundBlobs">
    <div :class="[$style.blob, $style.blob1]"></div>
    <div :class="[$style.blob, $style.blob2]"></div>
    <div :class="[$style.blob, $style.blob3]"></div>
  </div>
</template>

<style module>
/* 背景动画 */
.backgroundBlobs {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
}

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;
  animation: blobFloat 20s infinite alternate;
}

.blob1 {
  width: 400px;
  height: 400px;
  background: #ff9a9e;
  top: -100px;
  left: -100px;
  animation-duration: 25s;
}

.blob2 {
  width: 500px;
  height: 500px;
  background: #a18cd1;
  bottom: -150px;
  right: -100px;
  animation-duration: 30s;
  animation-delay: -5s;
}

.blob3 {
  width: 300px;
  height: 300px;
  background: #fbc2eb;
  top: 40%;
  left: 30%;
  animation-duration: 22s;
  animation-delay: -10s;
}

@keyframes blobFloat {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
}
</style>

<script setup lang="ts">
const props= defineProps({
  text:{
    type:String,
    default:"Btn-1"
}
})
</script>

<template>
  <div :class="$style.containerTop"><span>{{text}}</span></div>
</template>

<style module>
.containerTop{
  height: 40px;
  padding: 0 20px;
  border-radius: 8px;
  background: transparent;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.containerTop::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background: #3498db;
  transition: width 0.3s ease;
}

.containerTop:hover::before {
  width: 80%;
}

.containerTop:hover{
  background: rgba(52, 152, 219, 0.05);
}

.containerTop:hover span {
  color: #3498db;
}

span{
  color: #333;
  font-size: 14px;
  font-weight: 500;
  transition: color 0.3s ease;
}
</style>
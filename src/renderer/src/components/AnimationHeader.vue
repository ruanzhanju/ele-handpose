<template>
  <header class="header">
    <div id="randColorAnimation">Set up personal plans</div>
  </header>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

class RandColorAnimation {
  constructor(private el: HTMLDivElement, private text = [...el.innerHTML]) {
    this.el.innerHTML = ''
  }
  private randomColorValue(): string {
    const arr = ['7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
    return arr[Math.floor(Math.random() * arr.length)]
  }
  private color(): string {
    return (
      '#' +
      Array(6)
        .fill(null)
        .map(() => this.randomColorValue())
        .join('')
    )
  }
  public run(): void {
    this.text.forEach((str, i) => {
      this.el.insertAdjacentHTML(
        'beforeend',
        `<div style="color:${this.color()}; animation-delay:${i * 0.1}s">${str}</div>`
      )
    })
  }
}
onMounted(() => {
  new RandColorAnimation(document.querySelector('#randColorAnimation')!).run()
})
</script>

<style lang="less" scoped>
.header {
  @apply h-24 flex justify-center items-center bg-[#2c3e50] cursor-pointer;
  #randColorAnimation {
    display: grid;
    grid-auto-flow: column;
    white-space: pre;
    font-size: 2.25rem;
  }
  &:hover {
    #randColorAnimation {
      :deep(div) {
        animation: myscale 0.5s;
      }
    }
  }
}

@keyframes myscale {
  50% {
    margin: 0 1rem;
    transform: scale(3);
  }
  to {
    transform: scale(1);
  }
}
</style>

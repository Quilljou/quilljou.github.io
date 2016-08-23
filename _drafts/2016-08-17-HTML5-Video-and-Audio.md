# HTML5 Video and Music Player

HTML5和CSS3让电脑科技变得平易近人，这让我们可以自由定制自己的HTML5播放器

## 视频播放器

```html
<video controls="controls" preload="auto" id="video" poster="../../../img/maxresdefault.jpg">
  <source src="../../../video/The Chainsmokers - Closer (Lyric) ft. Halsey.mp4" type="video/mp4"/>
  <p>你的浏览器不支持<code>video</code>元素</p>
</video>
```
取得对video元素的引用，可以通过w3c标准的media events API对这个对象进行控制

* play() 播放视频
* pause() 暂停播放视频
* load() 重新加载视频
* currentTime += 10 播放进度前进10s
* currentTime -= 10 播放进度后退10s
* currentTime = 50 播放进度定位至10s
* currentTime = 50 播放进度定位至50s
* playbackRate++ 播放速率加1
* playbackRate-- 播放速率减1
* playbackRate+=0.1 播放速率加快0.1
* playbackRate+=0.1 播放速率减慢0.1
ps:正常速度1,chrome的速率范围是0.0625 - 16.0，火狐的速率范围是0.25 - 5.0，超出这些范围会被静音
* volume+=0.1 加快0.1音量
* volume+=0.1 加快0.1音量
ps:音量的范围在0～1之间
* muted=true 静音
* muted=false  恢复音量

### 优雅降级

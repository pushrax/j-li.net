AffixedScroller = (function(viewport) {
  "use strict";

  function AffixedScroller(node) {
    if (this instanceof AffixedScroller) {
      this.node = node;
      this.height = node.offsetHeight;
      this.basePosition = node.style.position || 'absolute';
      this.unaffix();
    } else {
      var scroller = new AffixedScroller(node);
      scroller.attachEvents();
      return scroller;
    }
  }

  AffixedScroller.prototype.unaffix = function() {
    this.scrollingUp = this.affixed = false;
    this.bottomY = this.offsetY = this.cachedY = 0;
    this.node.style.position = this.basePosition;
    this.node.classList.remove('affixed-bar');
    this.transform(null);
  };

  AffixedScroller.prototype.affix = function() {
    if (!this.affixed) {
      this.affixed = true;
      this.node.style.position = 'fixed';
      this.node.classList.add('affixed-bar');
    }
  };

  AffixedScroller.prototype.transform = function(offsetY) {
    var translation = '';
    if (offsetY !== null) {
      translation = 'translateY(' + (offsetY - this.height) + 'px)';
    }

    this.node.style.webkitTransform = translation;
  };

  AffixedScroller.prototype.animate = function(current, target) {
    var start = Date.now(), end = start + 100, down = current < target, tick;

    tick = (function() {
      var offset = (target - current) / ((end - start) / (Date.now() - start)) + current;

      this.offsetY = down ? Math.min(offset, this.height) : Math.max(offset, 0);
      this.transform(this.offsetY);

      if (this.offsetY === target) {
        this.animating = false;
      } else {
        viewport.requestAnimationFrame(tick);
      }
    }).bind(this);

    this.animating = true;
    viewport.requestAnimationFrame(tick);
  };

  AffixedScroller.prototype.onScroll = function(event) {
    var top = viewport.scrollY, delta = this.cachedY - top;

    if (this.animating) {
      return;
    }

    if (top <= 0) {
      return this.unaffix();
    }

    if (viewport.innerHeight + top > document.documentElement.scrollHeight) {
      return;
    }

    if (top < this.cachedY && this.height > this.offsetY) {
      this.affix();
      this.bottomY += delta;

      if (delta > 20) {
        // Force position to update when scrolling rapidly.
        this.animate(this.offsetY, this.height);
        this.offsetY = this.height;
      } else if (this.bottomY >= 25) {
        this.offsetY = Math.min(this.bottomY - 25, this.height);
      }

      this.transform(this.offsetY);
      this.scrollingUp = true;
    } else if (top > this.cachedY && this.affixed) {
      this.bottomY = Math.min(this.bottomY, this.height) + this.cachedY - top;
      this.offsetY = Math.max(this.bottomY, 0);
      this.transform(this.offsetY);
      this.scrollingUp = false;
    }

    if (this.bottomY <= 0) {
      this.unaffix();
    }
    this.cachedY = top;
  };

  AffixedScroller.prototype.attachEvents = function() {
    if (!this._listener) {
      viewport.addEventListener('scroll', this._listener = this.onScroll.bind(this));
    }
  };

  AffixedScroller.prototype.detachEvents = function() {
    if (this._listener) {
      viewport.removeEventListener('scroll', this._listener);
      delete this._listener;
    }
  };

  return AffixedScroller;
})(window);


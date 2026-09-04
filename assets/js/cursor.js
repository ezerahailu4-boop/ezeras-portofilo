(function () {
    var cursor = {
        delay: 8,
        _x: -100,
        _y: -100,
        endX: -100,
        endY: -100,
        cursorVisible: false,
        cursorEnlarged: false,
        cursorActive: false,
        $dot: null,
        $outline: null,
        rafId: null,
        initialized: false,

        init: function () {
            var self = this;
            if (self.initialized) return;
            self.initialized = true;

            // Find or dynamically create dot and outline elements if missing
            self.$dot = document.querySelector('.cursor-dot');
            self.$outline = document.querySelector('.cursor-dot-outline');

            if (!self.$dot) {
                self.$dot = document.createElement('div');
                self.$dot.className = 'cursor-dot';
                document.body.appendChild(self.$dot);
            }
            if (!self.$outline) {
                self.$outline = document.createElement('div');
                self.$outline.className = 'cursor-dot-outline';
                document.body.appendChild(self.$outline);
            }

            self.setupEventListeners();
            self.animateDotOutline();
        },

        setupEventListeners: function () {
            var self = this;

            // Handle pointer movement: supports mouse, trackpad, and hybrid devices
            function handlePointerMove(e) {
                // If it's a touch gesture on a touch screen, disable custom cursor
                if (e.pointerType === 'touch') {
                    self.disableCustomCursor();
                    return;
                }

                self.enableCustomCursor();

                self.endX = e.clientX;
                self.endY = e.clientY;

                if (self.$dot) {
                    self.$dot.style.top = self.endY + 'px';
                    self.$dot.style.left = self.endX + 'px';
                }
            }

            if (window.PointerEvent) {
                window.addEventListener('pointermove', handlePointerMove, { passive: true });
            } else {
                window.addEventListener('mousemove', function (e) {
                    self.enableCustomCursor();
                    self.endX = e.clientX;
                    self.endY = e.clientY;
                    if (self.$dot) {
                        self.$dot.style.top = self.endY + 'px';
                        self.$dot.style.left = self.endX + 'px';
                    }
                }, { passive: true });
            }

            // Click down / up animation
            window.addEventListener('mousedown', function () {
                self.cursorActive = true;
                self.updateCursorClasses();
            });

            window.addEventListener('mouseup', function () {
                self.cursorActive = false;
                self.updateCursorClasses();
            });

            // Delegate hover detection for clickable / interactive elements
            document.addEventListener('mouseover', function (e) {
                var interactive = e.target.closest('a, button, input[type="submit"], input[type="button"], [role="button"], .nav-link, .card, .btn');
                if (interactive) {
                    self.cursorEnlarged = true;
                    self.updateCursorClasses();
                }
            });

            document.addEventListener('mouseout', function (e) {
                var interactive = e.target.closest('a, button, input[type="submit"], input[type="button"], [role="button"], .nav-link, .card, .btn');
                if (interactive) {
                    self.cursorEnlarged = false;
                    self.updateCursorClasses();
                }
            });

            // Browser window boundary detection
            document.addEventListener('mouseenter', function () {
                if (document.body.classList.contains('custom-cursor-enabled')) {
                    self.showCursor();
                }
            });

            document.addEventListener('mouseleave', function () {
                self.hideCursor();
            });

            // Cleanly deactivate when screen is tapped with finger
            window.addEventListener('touchstart', function () {
                self.disableCustomCursor();
            }, { passive: true });
        },

        enableCustomCursor: function () {
            if (!document.body.classList.contains('custom-cursor-enabled')) {
                document.body.classList.add('custom-cursor-enabled');
                this._x = this.endX;
                this._y = this.endY;
            }
            this.showCursor();
        },

        disableCustomCursor: function () {
            document.body.classList.remove('custom-cursor-enabled');
            this.hideCursor();
        },

        showCursor: function () {
            if (this.$dot) this.$dot.style.opacity = '1';
            if (this.$outline) this.$outline.style.opacity = '1';
        },

        hideCursor: function () {
            if (this.$dot) this.$dot.style.opacity = '0';
            if (this.$outline) this.$outline.style.opacity = '0';
        },

        updateCursorClasses: function () {
            if (!this.$dot || !this.$outline) return;

            if (this.cursorEnlarged) {
                this.$dot.classList.add('cursor-hover');
                this.$outline.classList.add('cursor-hover');
            } else {
                this.$dot.classList.remove('cursor-hover');
                this.$outline.classList.remove('cursor-hover');
            }

            if (this.cursorActive) {
                this.$dot.classList.add('cursor-active');
                this.$outline.classList.add('cursor-active');
            } else {
                this.$dot.classList.remove('cursor-active');
                this.$outline.classList.remove('cursor-active');
            }
        },

        animateDotOutline: function () {
            var self = this;

            self._x += (self.endX - self._x) / self.delay;
            self._y += (self.endY - self._y) / self.delay;

            if (self.$outline) {
                self.$outline.style.top = self._y + 'px';
                self.$outline.style.left = self._x + 'px';
            }

            self.rafId = requestAnimationFrame(self.animateDotOutline.bind(self));
        }
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            cursor.init();
        });
    } else {
        cursor.init();
    }
})();


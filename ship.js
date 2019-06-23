var shipImg;

function Ship() {
    this.x = width / 2;
    this.r = 15;
    this.direction = {
        left: false,
        right: false
    };


    this.show = function () {
        image(shipImg, this.x - 15, 520, 139*.75, 105*.75);
    }

    this.move = function () {
        if (this.direction.left && this.x > 0) {
            this.x -= 5;
        } else if (this.direction.right && this.x < width) {
            this.x += 5;
        } else {
            this.x = this.x;
        }
    }
}

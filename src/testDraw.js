// _engine.Core.mContext.strokeRect(Math.random() * _engine.Core.mWidth,
//     Math.random() * _engine.Core.mHeight,
//     Math.random() * 30 + 10, Math.random() * 30 + 10);

let vec = new Vector(300,300, 300, 400);
vec.draw();
console.log(vec.mag());
vec2 = vec.rotate(90);
console.log(vec2);
vec2.draw();

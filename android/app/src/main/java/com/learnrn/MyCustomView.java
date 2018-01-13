package com.learnrn;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Paint;
import android.view.View;

/**
 * Created by jingdongqi on 2017/12/25.
 */

public class MyCustomView extends View{
    private Paint mPaint;
    public MyCustomView(Context context) {
        super(context);
//        mPaint = new Paint(Paint.ANTI_ALIAS_FLAG);
//        mPaint.setColor(0xffff0000);

    }


//    @Override
//    protected void onMeasure(int widthMeasureSpec, int heightMeasureSpec) {
//        super.onMeasure(widthMeasureSpec, heightMeasureSpec);
//        // 测试代码，onMeasure中设置的值通过getWidth()/getHeight()拿到的不一样，问题没找到
//        setMeasuredDimension(300, 300);
//    }
//
//    @Override
//    protected void onDraw(Canvas canvas) {
//        super.onDraw(canvas);
//        canvas.drawRect(0, 0, getWidth(), getHeight(), mPaint);
//    }
}

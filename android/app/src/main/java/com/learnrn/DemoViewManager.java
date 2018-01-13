package com.learnrn;

import android.os.Bundle;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.modules.appregistry.AppRegistry;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import java.util.HashMap;
import java.util.Map;

public class DemoViewManager extends ViewGroupManager<LinearLayout> {

    private static final String TAG = "DemoViewManager";

    @Override
    public String getName() {
        return "DemoView";
    }

    private ReactInstanceManager mReactInstanceManager;

    private LinearLayout mViewLayout;
    private TextView mTextView;
    private ReactRootView mDelayView;

    @Override
    protected LinearLayout createViewInstance(ThemedReactContext reactContext) {
        LinearLayout viewLayout = new LinearLayout(reactContext);
        viewLayout.setOrientation(LinearLayout.VERTICAL);
        viewLayout.setBackgroundColor(reactContext.getResources()
                .getColor(android.R.color.holo_blue_light));

        TextView textView = new TextView(reactContext);
        textView.setLayoutParams(new LinearLayout.LayoutParams(
                        ViewGroup.LayoutParams.MATCH_PARENT,
                        ViewGroup.LayoutParams.WRAP_CONTENT));
        textView.setBackgroundColor(reactContext.getResources()
                .getColor(android.R.color.holo_green_light));
        textView.setTextSize(14);

        mTextView = textView;

        viewLayout.addView(textView);

        ReactRootView delayView = new ReactRootView(reactContext);
        delayView.setLayoutParams(new LinearLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));

        Bundle bundle = new Bundle();
        bundle.putInt("section", 6);

        WritableNativeMap writableNativeMap = new WritableNativeMap();
        writableNativeMap.putDouble("rootTag", (double) delayView.getId());
        writableNativeMap.putMap("initialProps", Arguments.fromBundle(bundle));

        delayView.startReactApplication(mReactInstanceManager, "BlankView", bundle);

        mDelayView = delayView;

        viewLayout.addView(delayView);

        mViewLayout = viewLayout;

        return viewLayout;
    }

    @ReactProp(name = "title")
    public void setTitle(LinearLayout view, String text) {
        mTextView.setText(text);
    }

    @ReactProp(name = "alpha")
    public void setAlpha(LinearLayout view, float alpha) {
        mTextView.setAlpha(alpha);
    }

    @Override
    public Map<String, Integer> getCommandsMap() {
        Map<String, Integer> commandsMap = new HashMap<>();
        commandsMap.put("changeTextColor", 0);
        commandsMap.put("addView", 1);
        return commandsMap;
    }

    @Override
    public void receiveCommand(LinearLayout root, int commandId, ReadableArray args) {
        ReactContext reactContext = (ReactContext) root.getContext();
        switch (commandId) {
            case 0:
                int color = args.getInt(0);

                mTextView.setTextColor(color);

                WritableMap event = Arguments.createMap();
                event.putInt("color", color);
                reactContext.getJSModule(RCTEventEmitter.class)
                        .receiveEvent(mViewLayout.getId(), "textColorChange", event);
                break;
            case 1:
                String moduleName = args.getString(0);

                Bundle bundle = new Bundle();
                bundle.putInt("section", 6);

                WritableNativeMap writableNativeMap = new WritableNativeMap();
                writableNativeMap.putDouble("rootTag", (double) mDelayView.getId());
                writableNativeMap.putMap("initialProps", Arguments.fromBundle(bundle));

                reactContext.getJSModule(AppRegistry.class).runApplication(moduleName, writableNativeMap);
                break;
        }
        super.receiveCommand(root, commandId, args);
    }

    @Override
    public Map<String, Object> getExportedCustomBubblingEventTypeConstants() {
        MapBuilder.Builder<String, Object> mapBuilder = MapBuilder.builder();
        mapBuilder.put("textColorChange", MapBuilder.of("phasedRegistrationNames",
                MapBuilder.of("bubbled", "onTextColorChange")));
        return mapBuilder.build();
    }

    public void setReactInstanceManager(ReactInstanceManager reactInstanceManager) {
        mReactInstanceManager = reactInstanceManager;
    }
}

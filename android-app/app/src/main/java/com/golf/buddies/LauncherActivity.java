package com.golf.buddies;

import android.net.Uri;
import android.os.Bundle;
import androidx.browser.customtabs.CustomTabsIntent;
import androidx.appcompat.app.AppCompatActivity;

public class LauncherActivity extends AppCompatActivity {
    private static final String TWA_ORIGIN = "https://golf-buddies.vercel.app";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // Launch the PWA using Custom Tabs
        CustomTabsIntent.Builder builder = new CustomTabsIntent.Builder();
        builder.setShowTitle(false);
        builder.setUrlBarHidingEnabled(true);

        CustomTabsIntent customTabsIntent = builder.build();
        customTabsIntent.intent.setPackage("com.android.chrome");

        // Launch the URL
        customTabsIntent.launchUrl(this, Uri.parse(TWA_ORIGIN));

        // Close this activity so the back button works correctly
        finish();
    }
}
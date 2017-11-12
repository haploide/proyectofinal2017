package com.example.ld.mapa;

import android.net.Uri;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.widget.VideoView;

/**
 * Created by ld on 12/11/17.
 */

public class AyudaVideos extends AppCompatActivity {
    VideoView videoView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.ayuda_videos);
        videoView = (VideoView) findViewById(R.id.videoView);
        String uriPath = getIntent().getExtras().getString("uriPath");
        videoPlay(videoView, uriPath);
    }

    public void videoPlay(View v, String uriPath) {
        // Prepara la URI del vídeo que será reproducido.
        Uri uri = Uri.parse(uriPath);
        videoView.setVideoURI(uri);
        videoView.start();

    }
}


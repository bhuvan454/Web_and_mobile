package com.example.vijaya.androidhardware;

import android.content.Context;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.text.SimpleDateFormat;
import java.util.Date;

public class StorageActivity extends AppCompatActivity {
    EditText txt_content;
    TextView contenttoDisplay;
    private File pathSave;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_storage);
        txt_content = findViewById(R.id.id_txt_mycontent);
        contenttoDisplay =  findViewById(R.id.id_txt_display);


        String timeStamp = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
        String filename = "sample" + timeStamp + ".txt";

        pathSave = new File(getFilesDir(), filename);
    }

    public void saveTofile(View view) {

        // ICP Task4: Write the code to save the text

        // code I wrote here

        String text= txt_content.getText().toString();
        text = text + " ";
        FileOutputStream fos = null;
        try {
            fos = new FileOutputStream(pathSave, true);
            fos.write(text.getBytes());
            txt_content.getText().clear();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (fos != null) {
                try {
                    fos.close();

                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }


    public void retrieveFromFile(View view) {

        // ICP Task4: Write the code to display the above saved text

        // code  I wrote here
        FileInputStream fis = null;
        try {
            fis = new FileInputStream(pathSave);
            InputStreamReader inputStreamReader = new InputStreamReader(fis);
            BufferedReader bufferedReader = new BufferedReader(inputStreamReader);
            StringBuilder stringBuilder = new StringBuilder();
            String text ;
            while ((text = bufferedReader.readLine()) != null) {
                stringBuilder.append(text).append("\n");
            }
            contenttoDisplay.setText(stringBuilder.toString());
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (fis != null) {
                try {
                    fis.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }


    }
}

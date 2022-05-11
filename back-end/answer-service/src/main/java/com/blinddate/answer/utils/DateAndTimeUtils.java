package com.blinddate.answer.utils;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateAndTimeUtils {
    public static String getCurrentDateAndTime() {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now = LocalDateTime.now();
        return dtf.format(now);
    }
}

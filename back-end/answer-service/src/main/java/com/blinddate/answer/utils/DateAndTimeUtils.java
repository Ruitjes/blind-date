package com.blinddate.answer.utils;

import java.time.OffsetDateTime;

public class DateAndTimeUtils {
    public static String getCurrentDateAndTime() {
        return OffsetDateTime.now().toString();
    }
}

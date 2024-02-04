package _posts.Java.CodingTestWithJava.CodeTest;

import java.util.*;

// 실행 방법 : java Solution.java

public class Solution {
    // Lv1.같은숫자는싫어
    public static int[] solution(int[] arr) {
        int[] answer = new int[10];
        try {
            int index = 1;
            answer[0] = arr[0];
            for (int i = 1; i < arr.length; i++) {
                System.out.println("1");
                if (arr[i] != arr[i - 1]) {
                    System.out.println("2");
                    answer[index++] = arr[i];
                }
            }

        } catch (ArrayIndexOutOfBoundsException e) {
            System.out.println("배열 인덱스 다시 확인 : " + e);
        } catch (Exception e) {
            System.out.println("새로운 예외 : " + e);
        }
        System.out.println("3");
        return answer;
    }

    public static void main(String[] args) {

        int[] inputArray = { 1, 1, 3, 3, 0, 1, 1 };
        // int[] inputArray = {4,4,4,3,3};

        int[] resultArray = solution(inputArray);
        System.out.println();
        System.out.println("제공된 값 : " + Arrays.toString(inputArray));
        System.out.println("결과 값 : " + Arrays.toString(resultArray));
        System.out.println();
    }
}

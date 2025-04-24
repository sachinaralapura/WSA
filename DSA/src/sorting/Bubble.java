package src.sorting;

public class Bubble extends Sort {
    public <T extends Comparable<T>> void sort(T[] array) {
        int n = array.length;
        boolean swaped;
        for (int i = 0; i < n - 1; i++) {
            swaped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (array[j].compareTo(array[j + 1]) > 0) {
                    T temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                    swaped = true;
                }
            }
            if (!swaped)
                break;
        }
    }
}
package test.jUnit;

import static main.Algorithm.inPlaceQuickSort;
import static main.Algorithm.isPalindrom;
import static main.Algorithm.quickSort;
import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.junit.Test;

public class TestAlgorithm {

	@Test
	public void testIsPalindrom() {

		Map<String, Boolean> stringMap = new HashMap<>();
		stringMap.put("kayak", true);
		stringMap.put("abba", true);
		stringMap.put("A man, a plan, a canal: Panama     ", true);
		stringMap.put("tims", false);
		stringMap.put("abab", false);
		stringMap.put("testIsPalindrom", false);
		stringMap.put("20/02/2002", true);
		stringMap.put("Esope reste ici @2@ ici et se repose", true);

		// Test if the words are palindromes
		for (Entry<String, Boolean> stringMapEntry : stringMap.entrySet()) {
			assertEquals(stringMapEntry.getKey(), stringMapEntry.getValue(), isPalindrom(stringMapEntry.getKey()));
		}

	}

	@Test
	public void testQuickSort() {
		List<Integer> testB = new ArrayList<>();
		testB.addAll(List.of(9, 2, 1, 9, 19, 12, 23, 11, 2));

		List<Integer> result = quickSort(testB);

		assertEquals(List.of(1, 2, 2, 9, 9, 11, 12, 19, 23), result);
	}

	@Test
	public void testInPlaceQuickSort() {
		List<Integer> testB = new ArrayList<>();
		testB.addAll(List.of(9, 2, 1, 9, 19, 12, 23, 11, 2));

		inPlaceQuickSort(testB);

		assertEquals(List.of(1, 2, 2, 9, 9, 11, 12, 19, 23), testB);

	}

}

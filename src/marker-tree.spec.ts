import { byKey, complex, simple } from "./marker-tree"
import type { InferMarkerType } from "./types"

const simpleItems = byKey(simple)

const part = complex({
	subValue1: simple,
	subValue2: simple,
	simpleItems: simpleItems,
})

type PartMarker = InferMarkerType<typeof part>

const s = complex({
	child1: simple,
	child2: part,
	items: byKey(complex({
		id: simple,
		actions: simple,
	})),
})

describe("marker-tree", () => {
	it("should create valid marker strings", () => {
		function getSubValue2FromPartMarker(partMarker: PartMarker) {
			return partMarker.subValue2.value
		}

		const root = s("root")
		expect(root.value).toBe("root")
		expect(root.child1.value).toBe("root/child1")
		expect(root.child2.subValue1.value).toBe("root/child2/subValue1")
		expect(getSubValue2FromPartMarker(root.child2)).toBe("root/child2/subValue2")

		const otherRoot = part("other")
		expect(otherRoot.subValue1.value).toBe("other/subValue1")
		expect(getSubValue2FromPartMarker(otherRoot)).toBe("other/subValue2")

		expect(root.items("test1").id.value).toBe("root/items/test1/id")
		expect(otherRoot.simpleItems.value).toBe("other/simpleItems")
		expect(otherRoot.simpleItems("some").value).toBe("other/simpleItems/some")
	})
})
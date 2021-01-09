;var expect = require("chai").expect;

const {
    exponencial,
    direcciones,
    deepEqualArrays,
    OrderedLinkedList,
    multiCallbacks,
    primalityTest,
    quickSort,
    reverse,
    Queue,
    LinkedList,
    Node,
    BinarySearchTree
} = require('../checkpoint');

describe('Practica del Checkpoint M1', function(){

    describe('EJERCICIO 1: exponencial:', function() {
        let sqrt = exponencial(2);
        let e4 = exponencial(4);
        let e3 = exponencial(3);
        xit('La funcion hija debe de elevar al cuadrado, si 2 le es pasado como parametro a la funcion padre', function() {
            expect(typeof sqrt).to.be.equal('function');
            expect(sqrt(2)).to.be.equal(4);
            expect(sqrt(3)).to.be.equal(9);
            expect(sqrt(4)).to.be.equal(16);
        });
        xit('La funcion hija debe de elevar al cubo, si 3 le es pasado como parametro a la funcion padre', function() {
            expect(typeof e3).to.be.equal('function');
            expect(e3(2)).to.be.equal(8);
            expect(e3(3)).to.be.equal(27);
            expect(e3(4)).to.be.equal(64);
        });
        xit('La funcion hija debe de elevar a 4, si 4 le es pasado como parametro a la funcion padre', function() {
            expect(typeof e4).to.be.equal('function');
            expect(e4(2)).to.be.equal(16);
            expect(e4(3)).to.be.equal(81);
            expect(e4(4)).to.be.equal(256);
        });
    })

    describe('EJERCICIO 2: direcciones:', function(){
        let lab1 = {
            N: 'pared', S: {
                N: 'pared', S: 'pared', E: 'pared', O: {
                    N: 'pared', S: 'destino', E: 'pared', O: 'pared'
                }
            }, E: 'pared', O: 'pared'
        }
        let lab2 = {
            N: 'pared', S: 'pared', E: {
                N: 'pared', S: {
                    N: 'pared', S: 'pared', E: 'pared', O: {
                        N: {
                            N: 'pared', S: 'pared', E: 'pared', O: {
                                N: 'pared', S: {
                                    N: 'pared', S: 'pared', E: 'destino', O: 'pared'
                                }, E: 'pared', O: 'pared'
                            }
                        }, S: 'pared', E: 'pared', O: 'pared'
                    }
                }, E: 'pared', O: 'pared'
            }, O: 'pared'
        }
        let lab3 = {
            N: 'pared', S: 'pared', E: {
                N: 'pared', S: {
                    N: 'pared', S: 'pared', E: 'pared', O: {
                        N: 'pared', S: {
                            N: 'pared', S: 'pared', E: {
                                N: 'pared', S: 'pared', E: 'destino', O: 'pared'
                            }, O: 'pared'
                        }, E: 'pared', O: 'pared'
                    }
                }, E: 'pared', O: 'pared'
            }, O: 'pared'
        }
        xit("Si no se le pasa un laberinto debe retornar ''", function() {
            expect(direcciones()).to.be.equal('');
        });
        xit("Si se le pasa un laberinto sin destino debe retornar ''", function() {
            expect(direcciones({N:'pared', S:'pared', E:'pared', O:'pared'})).to.be.equal('');
        });
        xit("Debe encontrar el destino dentro del laberinto y retornar los movimientos", function() {
            expect(direcciones(lab1)).to.be.equal('SOS');
            expect(direcciones(lab2)).to.be.equal('ESONOSE');
            expect(direcciones(lab3)).to.be.equal('ESOSEE');
        });
    })

    describe('EJERCICIO 3: deepEqualArrays', function(){
        xit('Debe hacer comparaciones superficiales', function(){
            expect(deepEqualArrays(
                [0,1,2],
                [0,1,2]
            )).to.be.true;
        })
        xit('Debe comparar el tipo de cada elemento tambien', function(){
            expect(deepEqualArrays(
                [0,1,2],
                ['0','1','2']
            )).to.be.false;
        })
        xit('Debe comparar todos los elementos de ambos arrays', function(){
            expect(deepEqualArrays(
                [0,1,2],
                [0,1,2,4]
            )).to.be.false;
        })
        xit("Debe de hacer comparacion en 'profundidad'", function(){
            expect(deepEqualArrays(
                [0,1,[[0,1,2],1,2]],
                [0,1,[[0,1,2],1,2]]
            )).to.be.true;
        })
    })

    describe("EJERCICIO 4: OrderedLinkedList metodo add", function(){
        let ll = new OrderedLinkedList()
        xit("debe agregar nodos a la OrderedLinkedList", function(){
            ll.add(5)
            let ll2 = new OrderedLinkedList()
            ll2.head = new Node(5)
            expect(ll).to.be.deep.equal(ll2)
        })
        xit("debe agregar nodos a la OrderedLinkedList, despues de los nodos mayores al argumento", function(){
            ll.add(1)
            let ll2 = new OrderedLinkedList()
            ll2.head = new Node(5)
            ll2.head.next = new Node(1)
            expect(ll).to.be.deep.equal(ll2)
        })
        xit("debe agregar nodos a la OrderedLinkedList, antes de los nodos menores al argumento", function(){
            ll.add(4)
            let ll2 = new OrderedLinkedList()
            ll2.head = new Node(5)
            ll2.head.next = new Node(4)
            ll2.head.next.next = new Node(1)
            expect(ll).to.be.deep.equal(ll2)
        })
    })

    describe("EJERCICIO 5: OrderedLinkedList metodo removeHigher", function(){
        xit("debe retirar los nodos mas grandes de la OrderedLinkedList", function(){
            let ll = new OrderedLinkedList()
            ll.head = new Node(5)
            ll.head.next = new Node(4)
            ll.head.next.next = new Node(1)
            expect(ll.removeHigher()).to.be.equal(5)
            expect(ll.removeHigher()).to.be.equal(4)
            expect(ll.removeHigher()).to.be.equal(1)
            expect(ll.head).to.be.equal(null)
        })
        xit("si la OrderedLinkedList esta vacia debe retornar null", function(){
            let ll = new OrderedLinkedList()
            expect(ll.removeHigher()).to.be.equal(null)
            expect(ll.removeHigher()).to.be.equal(null)
            expect(ll.removeHigher()).to.be.equal(null)
        })
    })

    describe("EJERCICIO 6: OrderedLinkedList metodo removeLower", function(){
        xit("debe retirar los nodos mas chicos de la OrderedLinkedList", function(){
            let ll = new OrderedLinkedList()
            ll.head = new Node(5)
            ll.head.next = new Node(4)
            ll.head.next.next = new Node(1)
            expect(ll.removeLower()).to.be.equal(1)
            expect(ll.removeLower()).to.be.equal(4)
            expect(ll.removeLower()).to.be.equal(5)
            expect(ll.head).to.be.equal(null)
        })
        xit("si la OrderedLinkedList esta vacia debe retornar null", function(){
            let ll = new OrderedLinkedList()
            expect(ll.removeLower()).to.be.equal(null)
            expect(ll.removeLower()).to.be.equal(null)
            expect(ll.removeLower()).to.be.equal(null)
        })
    })

    describe("EJERCICIO 7: multiCallbacks", function(){
        let arr = []
        const cbs1 = [
            {cb:()=>(arr.push('1-1'),'1-1'), time: 2},
            {cb:()=>(arr.push('1-2'),'1-2'), time: 3}
        ];
        const cbs2 = [
            {cb:()=>(arr.push('2-1'),'2-1'), time: 1},
            {cb:()=>(arr.push('2-2'),'2-2'), time: 4}
        ];
        xit("todas las funciones(callbacks) deben haber sido llamadas", function(){
            arr = []
            multiCallbacks([...cbs1], [...cbs2])
            expect(arr.length).to.be.equal(4)
        })
        xit("las funciones deben haber sido llamadas en el orden correcto", function(){
            arr = []
            multiCallbacks([...cbs1], [...cbs2])
            expect(arr).to.be.deep.equal([ '2-1', '1-1', '1-2', '2-2' ])
        })
        xit("la funcion 'multiCallbacks' debe retornar un array con los resultados en el orden correcto", function(){
            expect(multiCallbacks([...cbs1], [...cbs2])).to.be.deep.equal([ '2-1', '1-1', '1-2', '2-2' ])
        })
    })

    describe("EJERCICIO 8: BinarySearchTree metodo toArray", function(){
        const BST = new BinarySearchTree(32)
        const arr = [8, 64, 5, 9];
        arr.forEach(e => BST.insert(e))
        xit("Debe devolver un Array", function(){
            expect(BST.toArray() instanceof Array).to.be.true;
        })
        xit("Debe devolver todos los elementos del arbol", function(){
            expect(BST.toArray() instanceof Array).to.be.true;
            expect(BST.toArray().length).to.be.equal(5);
        })
        xit("Debe devolver todos los elementos del arbol, en un array ordenado", function(){
            expect(BST.toArray()).to.be.deep.equal([ 5, 8, 9, 32, 64 ]);
        })
    })

    describe("EJERCICIO 9: primalityTest", function(){
        xit("debe de retornar 'true' si el numero es primo", function(){
            expect(primalityTest(2)).to.be.true;
            expect(primalityTest(3)).to.be.true;
            expect(primalityTest(5)).to.be.true;
            expect(primalityTest(7)).to.be.true;
        })
        xit("debe de retornar 'false' si el numero NO es primo", function(){
            expect(primalityTest(4)).to.be.false;
            expect(primalityTest(6)).to.be.false;
            expect(primalityTest(8)).to.be.false;
            expect(primalityTest(9)).to.be.false;
        })
        xit("debe de retornar 'false' si el numero es menor que 2", function(){
            expect(primalityTest(-1)).to.be.false;
            expect(primalityTest(0)).to.be.false;
            expect(primalityTest(1)).to.be.false;
        })
        xit("debe de estar lo suficientemente optimizado como para tardar menos de 2s con numeros grandes", function(){
            expect(primalityTest(1902680207)).to.be.true;
        })
    })

    describe("EJERCICIO 10: quickSort", function(){
        const arr = [2,5,9,3,4,7,1]
        xit("no debe de utilizar el metodo sort", function(){
            expect(quickSort.toString().includes('.sort')).to.be.false;
        })
        xit("debe devolver el arreglo ordenado", function(){
            expect(quickSort(arr)).to.be.deep.equal(arr.sort().reverse())
        })
    })

    describe("EJERCICIO 11: reverse", function(){
        xit("no debe de utilizar arrays o strings ni ninguna estructura identable", function(){
            const forbiddenKeys = ['function','=>','[',']','.toString()','String','stringify','Array','.pop','.push','.shift','.unshift','in']
            const reverseString = reverse.toString().slice(8)
            forbiddenKeys.forEach(key => {
                expect(reverseString.includes(key)).to.be.false;
            })
        })
        xit("debe devolver el numero invertido", function(){
            expect(reverse(123)).to.be.equal(321);
            expect(reverse(13543216)).to.be.equal(61234531);
            expect(reverse(85498322791)).to.be.equal(19722389458);
            expect(reverse(32168448733)).to.be.equal(33784486123);
        })
    })

});

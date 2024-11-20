import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

//global
const TREE_COLOR = {
  base: [40, 19, 7],
  highlight: [190, 37, 170],
};

const TREE_PROPERTIES = {
  initialWeight: 10,
  initialLength: 200,
  initialRecurseLevel: 0,
  maxRecurseLevel: 4,
  branchAngle: Math.PI * 0.3,
  branchAngleVariation: Math.PI * 0.2,
};

const BACKGROUND_COLOR = [225, 225, 225];

const ProceduralTree = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      let game;

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        game = new Game(p);
      };

      p.draw = () => {
        game.draw();
      };

      class Game {
        constructor(p) {
          this.p = p;
          this.trees = [];

          this.button = this.p.createButton('Make a new forest');
          this.button.position(this.p.width - 140, 20);
          this.button.mousePressed(() => this.drawNewForest());

          this.drawNewForest();
        }

        drawNewForest() {
          this.p.background(...BACKGROUND_COLOR);
          this.trees = [];

          const treeSpacing = 50;
          const numTrees = 1;

          for (let i = 0; i < numTrees; i++) {
            const offsetX = this.p.width * 0.4 + i * treeSpacing + this.p.random(-20, 20);
            const initialDrawStart = this.p.createVector(offsetX, this.p.height * 0.9);
            const initialAngle = this.p.PI * -0.5;

            const tree = new Branch(
              initialDrawStart,
              initialAngle,
              TREE_PROPERTIES.initialWeight,
              TREE_PROPERTIES.initialLength,
              TREE_PROPERTIES.initialRecurseLevel,
              this.p
            );
            this.trees.push(tree);
          }
        }

        draw() {
          for (const tree of this.trees) {
            tree.draw();
          }
        }
      }

      class Branch {
        constructor(drawStart, angle, lineWeight, length, recurseLevel, p) {
          this.p = p;
          this.branches = [];
          this.progress = 0;
          this.drawStart = drawStart;
          this.angle = angle;
          this.lineWeight = lineWeight;
          this.lengthToDraw = length;
          this.recurseLevel = recurseLevel;
        }

        draw() {
          if (this.progress < 1) {
            let drawEndX = this.drawStart.x;
            let drawEndY = this.drawStart.y;

            const drawEndXOffset = this.p.random(-0.5, 0.5) * (0.4 + 0.1 * this.recurseLevel);
            drawEndX += this.p.cos(this.angle + drawEndXOffset) * (this.lengthToDraw * 0.1);
            drawEndY += this.p.sin(this.angle) * (this.lengthToDraw * 0.1);

            if (this.recurseLevel >= 3) {
              let redShade = TREE_COLOR.highlight[0] + this.p.random(0, 50);
              redShade *= 0.5 + ((drawEndX - this.p.width * 0.5) + 200) / 400;
              redShade *= 0.5 * (600 / ((drawEndY - this.p.height * 0.9) + 600));

              this.p.stroke(redShade, TREE_COLOR.highlight[1], TREE_COLOR.highlight[2]);
              this.p.strokeWeight(this.p.random(2, 7));
            } else {
              this.p.stroke(...TREE_COLOR.base);
              this.p.strokeWeight(this.lineWeight);
            }

            this.p.line(this.drawStart.x, this.drawStart.y, drawEndX, drawEndY);
            this.drawStart.set(drawEndX, drawEndY);
            this.progress += 0.1;

            if (this.p.random(0, 1) > 0.5 && this.progress > 0.35) {
              this.spawnBranch();
            }

            if (this.progress >= 1) {
              this.spawnBranches();
            }
          } else {
            for (const branch of this.branches) {
              branch.draw();
            }
          }
        }

        spawnBranch() {
          if (this.recurseLevel >= TREE_PROPERTIES.maxRecurseLevel) {
            return;
          }

          const angleChange = TREE_PROPERTIES.branchAngle + (TREE_PROPERTIES.branchAngleVariation * this.recurseLevel);
          const angle = this.angle + this.p.random(-angleChange, angleChange);
          const lineWeight = this.lineWeight * 0.5;
          const lengthToDraw = this.lengthToDraw * (0.7 - this.recurseLevel * 0.15);
          const recurseLevel = this.recurseLevel + 1;
          const branch = new Branch(this.drawStart.copy(), angle, lineWeight, lengthToDraw, recurseLevel, this.p);
          this.branches.push(branch);
        }

        spawnBranches() {
          const nBranches = (this.recurseLevel >= 2) 
            ? this.p.floor(this.p.random(0, 8)) 
            : 2 + this.p.floor(this.p.random(0, 3));

          for (let i = 0; i < nBranches; i++) {
            this.spawnBranch();
          }
        }
      }
    };

    const myp5 = new p5(sketch, canvasRef.current);

    return () => {
      myp5.remove();
    };
  }, []);

  return <div ref={canvasRef} />;
};

export default ProceduralTree;
